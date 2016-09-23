# Backend API Specification

## Routes

### Index Page
All the requests which start neither with `/data/` nor with `/static/` return the index HTML page as response. These requests are allowed to be unauthenticated.

### Data 
Requests starting with `/data/` are designed to return data in JSON format. These requests are **not** allowed to be unauthenticated (except of those for *logon* feature).

### Static Assets
Requests starting with `/static/` are designed to return static assets, f.e:
* JavaScript code
* HTML templates
* CSS resources
These requests are allowed to be unauthenticated.

## Authentication & Authorization
Before being performed, client requests on data routes are validated against existing roles to have sufficient authorization.

There are 2 normal roles:
* USER (authorized to access application in read-only mode)
* ADMIN (authorized to add/update/remove data related to providers, indicators and territories)

There are also 2 special roles:
* GUEST (anonymous clients)
* ROOT (root-access client)

Client requests need a special header `X-Auth-Token` to be set and contain a valid security token. These tokens can be obtained through the standard logon feature.

When not containg any valid security token, requests are treated as anonymous by default.

## Business Features

### Periods
```
{
  "code": string (unique, not null),
  "title": string
}
```
#### Retrieve all existing time periods:
```
GET /data/periods
```
Returns a list of periods. Required roles: **USER** | **ADMIN**.

### Territories
```
{
  "code": string (unique, not null),
  "parentCode": string,
  "title": string,
  "description": string,
  "terminal": boolean (generated)
}
```
#### Retrieve all top-level territories:
```
GET /data/territories
```
Returns a list of territories. Required roles: **USER** | **ADMIN**.

#### Retrieve a specific territory by its code:
```
GET /data/territories/:code
```
Returns a territory. Required roles: **USER** | **ADMIN**.

#### Retrieve all descendants of a specific territory by its code:
```
GET /data/territories/:code/descendants
```
Returns a list of territories. Required roles: **USER** | **ADMIN**.

#### Add a new territory:
```
POST /data/territories
```
Accepts a territory, returns a territory. Required roles: **ADMIN**.

#### Update an existing territory by its code:
```
PUT /data/territories/:code
```
Accepts a territory, returns a territory. Required roles: **ADMIN**.

#### Remove an existing territory by its code:
```
DELETE /data/territories/:code
```
Returns nothing. Required roles: **ADMIN**.

### Indicators
```
{
  "code": string (unique, not null),
  "parentCode": string,
  "title": string,
  "description": string,
  "terminal": boolean (generated)
}
```
#### Retrieve all top-level indicators:
```
GET /data/indicators
```
Returns a list of indicators. Required roles: **USER** | **ADMIN**.

#### Retrieve a specific indicator by its code:
```
GET /data/indicators/:code
```
Returns an indicator. Required roles: **USER** | **ADMIN**.

#### Retrieve all descendants of a specific indicator by its code:
```
GET /data/indicators/:code/descendants
```
Returns a list of indicators. Required roles: **USER** | **ADMIN**.

#### Add a new indicator:
```
POST /data/indicators
```
Accepts an indicator, returns an indicator. Required roles: **ADMIN**.

#### Update an existing indicator by its code:
```
PUT /data/indicators/:code
```
Accepts an indicators, returns an indicators. Required roles: **ADMIN**.

#### Remove an existing indicator by its code:
```
DELETE /data/indicators/:code
```
Returns nothing. Required roles: **ADMIN**.

### Providers

```
{
  "id": string (unique, generated),
  "title": string,
  "description": string,
  "token": string (generated),
  "registeredAt": timestamp (generated),
  "grants": string[]
}
```

#### Retrieve all existing providers (paginated):
```
GET /data/providers?[offset]&[limit]
```
Returns a page of providers. Required roles: **USER** | **ADMIN**.

#### Retrieve a specific provider by its id:
```
GET /data/providers/:id
```
Returns a provider. Required roles: **USER** | **ADMIN**.

#### Add a new provider:
```
POST /data/providers
```
Accepts a provider, returns a provider. Required roles: **ADMIN**.

#### Update the grants of an existing provider by its id:
```
PUT /data/providers/:id/grants
```
Accepts a list of grants, returns a provider. Required roles: **ADMIN**.

#### Update the token of an existing provider by its id:
```
PUT /data/providers/:id/token
```
Returns a provider. Required roles: **ADMIN**.

#### Remove an existing provider:
```
DELETE /data/providers/:id
```
Returns nothing. Required roles: **ADMIN**.

### Patches

```
{
  "id": string (unique, generated),
  "comment": string,
  "createdAt": timestamp (generated),
  "providerId": string,
  "status": string,
  "indicatorInfos": {
    indicatorId: string,
    totalPoints: number
  }[]
}
```

#### Retrieve all existing patches (paginated & filtered):
```
GET /data/patches?[offset]&[limit]&[status]&[providerTitle]&[since]&[until]
```
Returns a page of patches. Required roles: **USER** | **ADMIN**.

#### Retrieve a specific patch by its id:
```
GET /data/patches/:id
```
Returns a patch. Required roles: **USER** | **ADMIN**.

## Security Features

### Logon
```
{
  "id": string (unique, generated),
  "createdAt": timestamp (generated),
  "userLogin": string
}
```

#### Create a new security token:
```
POST /data/security/logon
```
Accepts user credentials:
```
{
  "userLogin": string,
  "userSecret": string
}
```
Returns a security token. Unauthenticated requests are allowed.

### Logout

#### Remove an existing security token:
```
POST /data/security/logout
```
Returns nothing. Required roles: **GUEST** | **USER** | **ADMIN**.

### Users
```
{
  "id": string,
  "email": string,
  "fullname": string,
  "registeredAt": timestamp,
  "enabled": boolean,
  "special": boolean,
  "guest": boolean,
  "root": boolean,
  "roles": string[]
}
```

#### Retrieve a current logged-in user:
```
GET /data/security/users/current
```
Returns a user. Required roles: **GUEST** | **USER** | **ADMIN**.

## Guest Access
Guest access might be used to provide some very general insights of data in future.

## Root Access
Root access provides some additional functions that might be usefull at the development phase. It also bypasses any role validation. It **must be disabled** in a production environment.

#### Retrieve all existing user credentials:
```
GET /data/security/credentials
```
Returns a list of credentials.

#### Retrieve all existing security tokens:
```
GET /data/security/tokens
```
Returns a list of security tokens.

#### Retrieve all existing users:
```
GET /data/security/users
```
Returns a list of users.

## Special Notes
* User management is not designed (and is not planned).
* Codes of hierarchic items (like indicators or territories) can't be updated now.
* Timestamps are stored and passed as numbers (UNIX-time) now.
