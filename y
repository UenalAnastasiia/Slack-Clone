{
  "indexes": [
    {
      "collectionGroup": "threadComment",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "threadID",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "dateTime",
          "order": "ASCENDING"
        }
      ]
    },
    {
      "collectionGroup": "threads",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "channelID",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "sendDateTime",
          "order": "DESCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": []
}
