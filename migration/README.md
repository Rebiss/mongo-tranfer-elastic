# Dump

```sh
# mongoexport
#
# -d = Database Name, -c = Collection Name, -o = Output JSON file
$mongoexport -d products -c products -o mongoCollectionData.json
#
# ElasticSearch import Json file
#
# Local import
$curl -s -XPOST localhost:9200/products/name/_bulk?pretty -H "Content-Type: application/x-ndjson" --data-binary @"E:\dev\ex-nest\migration\mongoCollectionData.json"
#
#
# Send VM
$curl -s -XPOST 192.168.171.141:9200/products/name/_bulk?pretty -H "Content-Type: application/x-ndjson" --data-binary @"E:\dev\ex-nest\migration\mongoCollectionData.json"

```