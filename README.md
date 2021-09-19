<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Installation and Running

```sh
$ npm install
$ npm run start
##
# Run docker-compose
$docker-compose up -d
##
```

## ElasticSearch Query

```sh
##
# Check Index.
##
$curl -X GET http://192.168.171.141:9200/_aliases?pretty=true
##
# Get Data.
$curl -X GET http://localhost:9200/_search
##
# Delet all Indexes.
$curl -X DELETE 'localhost:9200/_all'
##
##
```

## Request (Create Product in MongoDB and Create Index in Elastic)
```bash
##
# Postman POST Request.
http://localhost:3022/api/v1/products
##
# Request Body
{
    "name": "Iphone 13",      # Indexed
    "price": 999,
    "isComplet": true,
    "llc": "Apple LLC"        # Indexed
}
##
# Postman POST Request.
http://localhost:3022/api/v1/elastic/search?q=PC/name/33
##
##
```

## Query description
```sh
########################################################################################################
#         |    Search Data      |               Elastic indexes                    | Pagination
#         |                     |                                                  |
# ?query= |    JavaScript       |    /  name   /   llc    /  ...  /  ...           |/ 22
#         |                     |                                                  |
#         | Should be the first |            Search fields                         | Should be the last
########################################################################################################
# Search for target data.
##
$ http://localhost:3022/api/v1/elastic/search?q={ SEARCH_STRING }
##
$ http://localhost:3022/api/v1/elastic/search?q={ SEARCH_STRING_1 SEARCH_STRING_2 }/{  SEARCH_FIELDS_1, ...}/{ 22 }
##
# Example.
$ http://localhost:3022/api/v1/elastic/search?q=JavaScript/title/tags/authors/12
##
```
