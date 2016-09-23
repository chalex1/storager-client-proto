# Backend API Specification

## Routes

#### Index Page
All the requests which start neither with `/data/` nor with `/static/` return the index HTML page as response.

#### Data 
Requests starting with `/data/` are designed to return data in JSON format.

#### Static Assets
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

#### Periods
*TODO: add this section*

#### Territories
*TODO: add this section*

#### Indicators
*TODO: add this section*

#### Providers
*TODO: add this section*

#### Patches
*TODO: add this section*

## Security Features

#### Logon
*TODO: add this section*

#### Logout
*TODO: add this section*

#### Users
*TODO: add this section*

## Root Access
*TODO: add this section*

## Special Notes
*TODO: add this section*
