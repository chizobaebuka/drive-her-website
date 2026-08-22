#!/usr/bin/env bash
# Smoke test for the lead-capture API. Run against a locally started server:
#   BASE=http://localhost:3000 ./scripts/api-smoke.sh
set -u
BASE="${BASE:-http://localhost:3000}"
API="$BASE/api/leads"

# Each case uses a distinct forwarded IP so the rate limiter does not colour
# the earlier results. Case 11 deliberately reuses one IP to trip it.
N=0
post() {
  N=$((N + 1))
  curl -s -X POST "$API" \
    -H 'content-type: application/json' \
    -H "origin: $BASE" \
    -H "x-forwarded-for: 203.0.113.$N" \
    -d "$1" -w " [%{http_code}]\n"
}

echo "1. valid submission (expect 201/202)"
post '{"name":"Ada Obi","email":"ada@example.com","phone":"+234 801 234 5678","organisation":"Example Fund","interest":"investment","message":"We would like to see the pre-seed deck and the memorandum.","consent":true,"company":"","elapsed":9000,"source":"/investors"}'

echo "2. invalid fields (expect 422 + fieldErrors)"
post '{"name":"A","email":"nope","interest":"investment","message":"short","consent":false,"elapsed":9000}'

echo "3. honeypot filled (expect 202, silently dropped)"
post '{"name":"Bot","email":"bot@example.com","interest":"general","message":"buy cheap things now click here","consent":true,"company":"AcmeBot","elapsed":9000}'

echo "4. submitted too fast (expect 202, silently dropped)"
post '{"name":"Speedy","email":"b@example.com","interest":"general","message":"instant submission test message","consent":true,"company":"","elapsed":10}'

echo "5. invalid interest enum (expect 422)"
post '{"name":"Ada Obi","email":"a@example.com","interest":"__proto__","message":"enum injection attempt here","consent":true,"elapsed":9000}'

echo "6. control characters in name (expect 422)"
printf '%s' '{"name":"AdaObi","email":"a@example.com","interest":"general","message":"control character test message","consent":true,"elapsed":9000}' > /tmp/dh-ctrl.json
curl -s -X POST "$API" -H 'content-type: application/json' -H "origin: $BASE" -H 'x-forwarded-for: 203.0.113.60' --data-binary @/tmp/dh-ctrl.json -w " [%{http_code}]\n"

echo "7. cross-origin post (expect 403)"
curl -s -X POST "$API" -H 'content-type: application/json' -H 'origin: https://evil.example' \
  -d '{"name":"X","email":"x@example.com","interest":"general","message":"cross site attempt here","consent":true,"elapsed":9000}' -w " [%{http_code}]\n"

echo "8. form-encoded post, simple-request CSRF shape (expect 415)"
curl -s -X POST "$API" -H 'content-type: application/x-www-form-urlencoded' -d 'name=x' -w " [%{http_code}]\n"

echo "9. GET (expect 405)"
curl -s "$API" -w " [%{http_code}]\n"

echo "10. oversized body (expect 413 or 422)"
BIG=$(head -c 20000 /dev/zero | tr '\0' 'x')
curl -s -X POST "$API" -H 'content-type: application/json' -H "origin: $BASE" -H 'x-forwarded-for: 203.0.113.70' \
  -d "{\"name\":\"A\",\"email\":\"a@example.com\",\"interest\":\"general\",\"consent\":true,\"elapsed\":9000,\"message\":\"$BIG\"}" \
  -w " [%{http_code}]\n"

echo "11. rate limit — 7 rapid valid posts (expect 429 after 5)"
for i in 1 2 3 4 5 6 7; do
  curl -s -o /dev/null -X POST "$API" -H 'content-type: application/json' -H "origin: $BASE" -H 'x-forwarded-for: 203.0.113.90' \
    -d '{"name":"Rate Test","email":"r@example.com","interest":"general","message":"rate limit probe message","consent":true,"company":"","elapsed":9000}' \
    -w "$i:%{http_code} "
done
echo
