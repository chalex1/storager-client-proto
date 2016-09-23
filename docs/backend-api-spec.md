# Backend API Specification

## Routes

### Index Page
All the requests which start neither with `/data/` nor with `/static/` return the index HTML page as response.

### Data 
Requests starting with `/data/` are designed to return data in JSON format.

### Static Assets
Requests starting with `/static/` are designed to return static assets, f.e:
* JavaScript code
* HTML templates
* CSS resources

## Authentication & Authorization
**Current status:** authentication and authorization are not applied at the moment.

Before being performed, client requests are validated against existing roles to have sufficient authorization.

There are 2 normal roles:
* USER (authorized to access application in read-only mode)
* ADMIN (authorized to add/update/remove data related to providers, indicators and territories)

There are also 2 special roles:
* GUEST (non-authenticated clients, might be switched off)
* ROOT (root-access client, might be switched off)

Client requests need a special header `X-Auth-Token` to be set and contain a valid security token. Tokens for the normal roles can be obtained through the standard logon feature. Tokens for the special roles are hard-defined and equal to the name of a respective role written in a lower case ('*guest*' for GUEST, '*root*' for ROOT).

When not containg any valid security token, requests are treated as unauthorized by default.

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
Returns a list of periods. Required roles: **USER** or **ADMIN**.

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
Returns a list of territories. Required roles: **USER** or **ADMIN**.

#### Retrieve a specific territory by its code:
```
GET /data/territories/:code
```
Returns a territory. Required roles: **USER** or **ADMIN**.

#### Retrieve all descendants of a specific territory by its code:
```
GET /data/territories/:code/descendants
```
Returns a list of territories. Required roles: **USER** or **ADMIN**.

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
Returns a list of indicators. Required roles: **USER** or **ADMIN**.

#### Retrieve a specific indicator by its code:
```
GET /data/indicators/:code
```
Returns an indicator. Required roles: **USER** or **ADMIN**.

#### Retrieve all descendants of a specific indicator by its code:
```
GET /data/indicators/:code/descendants
```
Returns a list of indicators. Required roles: **USER** or **ADMIN**.

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
  "registeredAt": number (generated),
  "grants": string[]
}
```

#### Retrieve all existing providers (paginated):
```
GET /data/providers?[offset]&[limit]
```
Returns a page of providers. Required roles: **USER** or **ADMIN**.

#### Retrieve a specific provider by its id:
```
GET /data/providers/:id
```
Returns a provider. Required roles: **USER** or **ADMIN**.

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
  "createdAt": number (generated),
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
Returns a page of patches. Required roles: **USER** or **ADMIN**.

#### Retrieve a specific patch by its id:
```
GET /data/patches/:id
```
Returns a patch. Required roles: **USER** or **ADMIN**.

## Security Features

### Logon
*TODO: add this section*

### Logout
*TODO: add this section*

### Users
*TODO: add this section*

## Root Access
*TODO: add this section*

## Special Notes
* Codes of hierarchic items (like indicators or territories) can't be updated now.
