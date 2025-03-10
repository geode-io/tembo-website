---
sidebar_position: 8
tags:
  - api
  - domains
  - network
  - dns
---

# Custom domains

Configure custom domains that are in your Postgres connection URLs.

## Design

Tembo uses Server Name Indication (SNI) for routing encrypted TLS traffic into the correct instance. To allow for custom branding, Tembo provides an option for users to configure additional domain names that will be respected by SNI routing. The user must configure DNS on their domain to route requests to Tembo.

:::caution
No two instances can share the same domain name
:::

## Configuring a custom domain

In this example, our instance is called `custom-brand-check`, and we are in the organization `steven2`. First, we confirm that we have access to this instance.

```
psql 'postgresql://postgres:*****@org-steven2-inst-custom-brand-check.data-1.use1.tembo.io:5432'
psql (15.3 (Homebrew))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
Type "help" for help.

postgres=#
```

We want to add an alternate domain name `steven.tembo-development.com`, so that we can connect to our instance with a connection string like this `postgresql://postgres:*****@steven.tembo-development.com:5432`.

### Configure TXT record

- Configure a TXT record on the custom domain name prefixed by `_tembo.`
  - For example, `_tembo.steven.tembo-development.com`
- The value should be the organization ID of the instance
  - For example, `org_2T7FJA0DpaNBnELVLU1IS4XzZG0`.

Confirming a TXT record is present:
``` console
# dig -t txt _tembo.steven.tembo-development.com

; <<>> DiG 9.10.6 <<>> -t txt _tembo.steven.tembo-development.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 27369
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;_tembo.steven.tembo-development.com. IN        TXT

;; ANSWER SECTION:
_tembo.steven.tembo-development.com. 300 IN TXT "org_2T7FJA0DpaNBnELVLU1IS4XzZG0"

;; Query time: 51 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Mon Sep 11 16:04:42 EDT 2023
;; MSG SIZE  rcvd: 108
```

### Configure CNAME record

Next, we configure a CNAME record so that when clients perform DNS resolution on `steven.tembo-development.com`, they are directed to Tembo Cloud.

- Add a CNAME record on the domain name, with the value `cloud.data-1.use1.tembo.io`
  - This assumes your database is in `data-1.use1`

Confirming a CNAME record is present:

``` console
$ dig -t cname steven.tembo-development.com

; <<>> DiG 9.10.6 <<>> -t cname steven.tembo-development.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 65291
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;steven.tembo-development.com.  IN      CNAME

;; ANSWER SECTION:
steven.tembo-development.com. 300 IN    CNAME   cloud.data-1.use1.tembo.io.

;; Query time: 49 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Mon Sep 11 16:08:37 EDT 2023
;; MSG SIZE  rcvd: 97
```

Also, if you try to connect now, the DNS resolution should direct to Tembo Cloud, but you should get disconnected because there is no SNI configuration yet.

```
psql 'postgresql://postgres:****@steven.tembo-development.com:5432'

psql: error: connection to server at "steven.tembo-development.com" (23.23.245.52), port 5432 failed: SSL SYSCALL error: Undefined error: 0
```

### Configure custom domain in Tembo Cloud

- Configure your instance in Tembo Cloud to use this custom domain name.

For example, using the API:

```bash
ORG_ID='org_2T7FJA0DpaNBnELVLU1IS4XzZG0'
INST_ID='inst_1694461015944_UYCow2_0'
JWT='****'

curl -X 'PATCH' \
  "https://api.tembo.io/api/v1/orgs/${ORG_ID}/instances/${INST_ID}" \
  -H 'accept: application/json' \
  -H "Authorization: Bearer ${JWT}" \
  -H 'Content-Type: application/json' \
  -d '{
  "extra_domains_rw": ["steven.tembo-development.com"]
}'
```

For more information on the API, see our [API guide](https://tembo.io/docs/tembo-cloud/api).

### Connect to instance with custom domain

Now, connecting to the instance is possible with the custom domain. Just substitute your domain into the connection string.

```
psql 'postgresql://postgres:****@steven.tembo-development.com:5432'
psql (15.3 (Homebrew))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
Type "help" for help.

postgres=#
```
