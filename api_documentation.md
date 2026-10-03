# V Chat API Documentation

## 1. Auth APIs
#### API 1.1: registerUser
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/auth/register`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/auth/register`
- **Route File**: `backend/routes/authRoutes.js`
- **Route Definition**: `router.post('/register')`
- **Controller**: `registerUser` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 1.2: loginUser
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/auth/login`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/auth/login`
- **Route File**: `backend/routes/authRoutes.js`
- **Route Definition**: `router.post('/login')`
- **Controller**: `loginUser` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 1.3: getMe
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/auth/me`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/auth/me`
- **Route File**: `backend/routes/authRoutes.js`
- **Route Definition**: `router.get('/me')`
- **Controller**: `getMe` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 2. Conversation APIs
#### API 2.1: markConversationRead
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/conversations/:conversationId/read`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/conversations/:conversationId/read`
- **Route File**: `backend/routes/conversationRoutes.js`
- **Route Definition**: `router.patch('/:conversationId/read')`
- **Controller**: `markConversationRead` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `conversationId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 2.2: updateConversationSetting
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/conversations/:conversationId/settings`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/conversations/:conversationId/settings`
- **Route File**: `backend/routes/conversationRoutes.js`
- **Route Definition**: `router.patch('/:conversationId/settings')`
- **Controller**: `updateConversationSetting` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `conversationId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 3. Message APIs
#### API 3.1: markMessagesAsRead
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/messages/read`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/read`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.patch('/read')`
- **Controller**: `markMessagesAsRead` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.2: markMessagesAsRead
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/messages/mark-read`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/mark-read`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.patch('/mark-read')`
- **Controller**: `markMessagesAsRead` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.3: getMessageById
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.get('/:messageId')`
- **Controller**: `getMessageById` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.4: markMessageAsRead
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId/read`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId/read`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.patch('/:messageId/read')`
- **Controller**: `markMessageAsRead` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.5: downloadAttachment
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/messages/download`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/download`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.get('/download')`
- **Controller**: `downloadAttachment` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.6: requireFeature('chat'
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.patch('/:messageId')`
- **Controller**: `requireFeature('chat'` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.7: requireFeature('chat'
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.delete('/:messageId')`
- **Controller**: `requireFeature('chat'` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.8: requireFeature('chat'
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId/delete-for-me`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId/delete-for-me`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.post('/:messageId/delete-for-me')`
- **Controller**: `requireFeature('chat'` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.9: requireFeature('chat'
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId/forward`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId/forward`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.post('/:messageId/forward')`
- **Controller**: `requireFeature('chat'` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.10: requireFeature('chat'
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId/reactions`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId/reactions`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.post('/:messageId/reactions')`
- **Controller**: `requireFeature('chat'` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.11: requireFeature('chat'
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId/reactions/:emoji`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId/reactions/:emoji`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.delete('/:messageId/reactions/:emoji')`
- **Controller**: `requireFeature('chat'` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
  - `emoji` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 3.12: requireFeature('chat'
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/messages/:messageId/poll/vote`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/messages/:messageId/poll/vote`
- **Route File**: `backend/routes/messageRoutes.js`
- **Route Definition**: `router.post('/:messageId/poll/vote')`
- **Controller**: `requireFeature('chat'` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 4. Pinnedmessage APIs
#### API 4.1: getPinnedMessages
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/pinned-messages`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/pinned-messages`
- **Route File**: `backend/routes/pinnedMessageRoutes.js`
- **Route Definition**: `router.get('/')`
- **Controller**: `getPinnedMessages` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 4.2: pinMessage
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/pinned-messages/:messageId/pin`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/pinned-messages/:messageId/pin`
- **Route File**: `backend/routes/pinnedMessageRoutes.js`
- **Route Definition**: `router.post('/:messageId/pin')`
- **Controller**: `pinMessage` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 4.3: unpinMessage
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/pinned-messages/:messageId/pin`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/pinned-messages/:messageId/pin`
- **Route File**: `backend/routes/pinnedMessageRoutes.js`
- **Route Definition**: `router.delete('/:messageId/pin')`
- **Controller**: `unpinMessage` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 5. Savedmessage APIs
#### API 5.1: getSavedMessages
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/saved-messages`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/saved-messages`
- **Route File**: `backend/routes/savedMessageRoutes.js`
- **Route Definition**: `router.get('/')`
- **Controller**: `getSavedMessages` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 5.2: saveMessage
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/saved-messages/:messageId/save`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/saved-messages/:messageId/save`
- **Route File**: `backend/routes/savedMessageRoutes.js`
- **Route Definition**: `router.post('/:messageId/save')`
- **Controller**: `saveMessage` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 5.3: unsaveMessage
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/saved-messages/:messageId/save`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/saved-messages/:messageId/save`
- **Route File**: `backend/routes/savedMessageRoutes.js`
- **Route Definition**: `router.delete('/:messageId/save')`
- **Controller**: `unsaveMessage` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `messageId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 6. User APIs
#### API 6.1: getTeamUsers
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/users`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.get('/')`
- **Controller**: `getTeamUsers` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.2: getProfile
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/users/profile`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/profile`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.get('/profile')`
- **Controller**: `getProfile` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.3: 1
- **Method**: `PUT`
- **Complete URL**: `http://localhost:5000/api/users/profile`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/profile`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.put('/profile')`
- **Controller**: `1` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `handleUpload('avatar'`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.4: 1
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/users/profile`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/profile`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.patch('/profile')`
- **Controller**: `1` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `handleUpload('avatar'`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.5: updateSettings
- **Method**: `PUT`
- **Complete URL**: `http://localhost:5000/api/users/settings`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/settings`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.put('/settings')`
- **Controller**: `updateSettings` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.6: updateSettings
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/users/settings`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/settings`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.patch('/settings')`
- **Controller**: `updateSettings` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.7: pinItem
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/users/pin-item`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/pin-item`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.post('/pin-item')`
- **Controller**: `pinItem` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.8: unpinItem
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/users/unpin-item`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/unpin-item`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.post('/unpin-item')`
- **Controller**: `unpinItem` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.9: updateFcmToken
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/users/fcm-token`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/fcm-token`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.post('/fcm-token')`
- **Controller**: `updateFcmToken` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 6.10: testFcmPush
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/users/test-fcm-push`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/users/test-fcm-push`
- **Route File**: `backend/routes/userRoutes.js`
- **Route Definition**: `router.post('/test-fcm-push')`
- **Controller**: `testFcmPush` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 7. Channel APIs
#### API 7.1: getPublicOrganizationSettings
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/channels/settings/organization`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/channels/settings/organization`
- **Route File**: `backend/routes/channelRoutes.js`
- **Route Definition**: `router.get('/settings/organization')`
- **Controller**: `getPublicOrganizationSettings` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 7.2: promoteChannelAdmin
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/channels/:id/admins`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/channels/:id/admins`
- **Route File**: `backend/routes/channelRoutes.js`
- **Route Definition**: `router.post('/:id/admins')`
- **Controller**: `promoteChannelAdmin` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 7.3: promoteChannelAdmin
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/channels/:id/promote-admin`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/channels/:id/promote-admin`
- **Route File**: `backend/routes/channelRoutes.js`
- **Route Definition**: `router.post('/:id/promote-admin')`
- **Controller**: `promoteChannelAdmin` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `requireActiveOrg`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 7.4: updateChannelSetting
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/channels/:id/settings`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/channels/:id/settings`
- **Route File**: `backend/routes/channelRoutes.js`
- **Route Definition**: `router.patch('/:id/settings')`
- **Controller**: `updateChannelSetting` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 8. Notification APIs
#### API 8.1: getNotifications
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/notifications`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/notifications`
- **Route File**: `backend/routes/notificationRoutes.js`
- **Route Definition**: `router.get('/')`
- **Controller**: `getNotifications` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 8.2: getUnreadCount
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/notifications/unread-count`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/notifications/unread-count`
- **Route File**: `backend/routes/notificationRoutes.js`
- **Route Definition**: `router.get('/unread-count')`
- **Controller**: `getUnreadCount` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 8.3: markAllRead
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/notifications/read-all`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/notifications/read-all`
- **Route File**: `backend/routes/notificationRoutes.js`
- **Route Definition**: `router.patch('/read-all')`
- **Controller**: `markAllRead` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 8.4: markRead
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/notifications/:id/read`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/notifications/:id/read`
- **Route File**: `backend/routes/notificationRoutes.js`
- **Route Definition**: `router.patch('/:id/read')`
- **Controller**: `markRead` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 9. Search APIs
#### API 9.1: searchAll
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/search`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/search`
- **Route File**: `backend/routes/searchRoutes.js`
- **Route Definition**: `router.get('/')`
- **Controller**: `searchAll` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 9.2: searchMessages
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/search/messages`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/search/messages`
- **Route File**: `backend/routes/searchRoutes.js`
- **Route Definition**: `router.get('/messages')`
- **Controller**: `searchMessages` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 10. Admin APIs
#### API 10.1: getWorkspaceStats
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/stats`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/stats`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/stats')`
- **Controller**: `getWorkspaceStats` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.2: getUsers
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/users`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/users`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/users')`
- **Controller**: `getUsers` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.3: updateUserRole
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/admin/users/:id/role`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/users/:id/role`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.patch('/users/:id/role')`
- **Controller**: `updateUserRole` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.4: updateUserStatus
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/admin/users/:id/status`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/users/:id/status`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.patch('/users/:id/status')`
- **Controller**: `updateUserStatus` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.5: updateUserPermissions
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/admin/users/:id/permissions`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/users/:id/permissions`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.patch('/users/:id/permissions')`
- **Controller**: `updateUserPermissions` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.6: inviteUserToOrganization
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/admin/invite-user`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/invite-user`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.post('/invite-user')`
- **Controller**: `inviteUserToOrganization` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.7: getJoinRequests
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/join-requests`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/join-requests`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/join-requests')`
- **Controller**: `getJoinRequests` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.8: approveJoinRequest
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/admin/join-requests/:id/approve`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/join-requests/:id/approve`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.post('/join-requests/:id/approve')`
- **Controller**: `approveJoinRequest` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.9: rejectJoinRequest
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/admin/join-requests/:id/reject`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/join-requests/:id/reject`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.post('/join-requests/:id/reject')`
- **Controller**: `rejectJoinRequest` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.10: getChannels
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/channels`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/channels`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/channels')`
- **Controller**: `getChannels` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.11: adminCreateChannel
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/admin/channels`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/channels`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.post('/channels')`
- **Controller**: `adminCreateChannel` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.12: updateChannel
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/admin/channels/:id`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/channels/:id`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.patch('/channels/:id')`
- **Controller**: `updateChannel` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.13: deleteChannel
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/admin/channels/:id`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/channels/:id`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.delete('/channels/:id')`
- **Controller**: `deleteChannel` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.14: getChannelMembers
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/channels/:id/members`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/channels/:id/members`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/channels/:id/members')`
- **Controller**: `getChannelMembers` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.15: addChannelMember
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/admin/channels/:id/members/:userId`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/channels/:id/members/:userId`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.post('/channels/:id/members/:userId')`
- **Controller**: `addChannelMember` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
  - `userId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.16: removeChannelMember
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/admin/channels/:id/members/:userId`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/channels/:id/members/:userId`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.delete('/channels/:id/members/:userId')`
- **Controller**: `removeChannelMember` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
  - `userId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.17: getMessages
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/messages`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/messages`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/messages')`
- **Controller**: `getMessages` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.18: deleteMessage
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/admin/messages/:id`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/messages/:id`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.delete('/messages/:id')`
- **Controller**: `deleteMessage` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.19: getAuditLogs
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/audit-logs`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/audit-logs`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/audit-logs')`
- **Controller**: `getAuditLogs` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.20: getOrganizationSettings
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/admin/settings`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/settings`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.get('/settings')`
- **Controller**: `getOrganizationSettings` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 10.21: updateOrganizationSettings
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/admin/settings`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/admin/settings`
- **Route File**: `backend/routes/adminRoutes.js`
- **Route Definition**: `router.patch('/settings')`
- **Controller**: `updateOrganizationSettings` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 11. Organization APIs
#### API 11.1: registerAndCreateCompany
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/organizations/register-company`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/organizations/register-company`
- **Route File**: `backend/routes/organizationRoutes.js`
- **Route Definition**: `router.post('/register-company')`
- **Controller**: `registerAndCreateCompany` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 11.2: createOrganization
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/organizations`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/organizations`
- **Route File**: `backend/routes/organizationRoutes.js`
- **Route Definition**: `router.post('/')`
- **Controller**: `createOrganization` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 11.3: getMyOrganizations
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/organizations/my`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/organizations/my`
- **Route File**: `backend/routes/organizationRoutes.js`
- **Route Definition**: `router.get('/my')`
- **Controller**: `getMyOrganizations` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 11.4: switchOrganization
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/organizations/:id/switch`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/organizations/:id/switch`
- **Route File**: `backend/routes/organizationRoutes.js`
- **Route Definition**: `router.post('/:id/switch')`
- **Controller**: `switchOrganization` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 11.5: getOrganizationPlanDetails
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/organizations/:id/plan`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/organizations/:id/plan`
- **Route File**: `backend/routes/organizationRoutes.js`
- **Route Definition**: `router.get('/:id/plan')`
- **Controller**: `getOrganizationPlanDetails` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 11.6: upgradeOrganizationPlan
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/organizations/:id/upgrade`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/organizations/:id/upgrade`
- **Route File**: `backend/routes/organizationRoutes.js`
- **Route Definition**: `router.post('/:id/upgrade')`
- **Controller**: `upgradeOrganizationPlan` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 11.7: getOrganizationStorage
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/organizations/:id/storage`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/organizations/:id/storage`
- **Route File**: `backend/routes/organizationRoutes.js`
- **Route Definition**: `router.get('/:id/storage')`
- **Controller**: `getOrganizationStorage` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 12. Todo APIs
#### API 12.1: toggleTodoStatus
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/todos/:todoId/status`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/todos/:todoId/status`
- **Route File**: `backend/routes/todoRoutes.js`
- **Route Definition**: `router.patch('/:todoId/status')`
- **Controller**: `toggleTodoStatus` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `todoId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 12.2: toggleTodoStatus
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/todos/:todoId/toggle`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/todos/:todoId/toggle`
- **Route File**: `backend/routes/todoRoutes.js`
- **Route Definition**: `router.patch('/:todoId/toggle')`
- **Controller**: `toggleTodoStatus` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `todoId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 13. Reminder APIs
#### API 13.1: toggleReminderComplete
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/reminders/:reminderId/complete`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/reminders/:reminderId/complete`
- **Route File**: `backend/routes/reminderRoutes.js`
- **Route Definition**: `router.patch('/:reminderId/complete')`
- **Controller**: `toggleReminderComplete` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `reminderId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 13.2: toggleReminderComplete
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/reminders/:reminderId/toggle`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/reminders/:reminderId/toggle`
- **Route File**: `backend/routes/reminderRoutes.js`
- **Route Definition**: `router.patch('/:reminderId/toggle')`
- **Controller**: `toggleReminderComplete` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `reminderId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 13.3: snoozeReminder
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/reminders/:reminderId/snooze`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/reminders/:reminderId/snooze`
- **Route File**: `backend/routes/reminderRoutes.js`
- **Route Definition**: `router.patch('/:reminderId/snooze')`
- **Controller**: `snoozeReminder` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `requireApprovedOrg`
- **Authorization**: `Bearer JWT + Approved Org Member`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `reminderId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 14. Note APIs
## 15. Superadmin APIs
#### API 15.1: getPlatformStats
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/super-admin/stats`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/stats`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.get('/stats')`
- **Controller**: `getPlatformStats` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 15.2: getAllOrganizations
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/super-admin/organizations`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/organizations`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.get('/organizations')`
- **Controller**: `getAllOrganizations` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 15.3: getOrganizationDetail
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/super-admin/organizations/:id`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/organizations/:id`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.get('/organizations/:id')`
- **Controller**: `getOrganizationDetail` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 15.4: activateOrganization
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/super-admin/organizations/:id/activate`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/organizations/:id/activate`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.patch('/organizations/:id/activate')`
- **Controller**: `activateOrganization` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 15.5: rejectOrganization
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/super-admin/organizations/:id/reject`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/organizations/:id/reject`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.patch('/organizations/:id/reject')`
- **Controller**: `rejectOrganization` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 15.6: suspendOrganization
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/super-admin/organizations/:id/suspend`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/organizations/:id/suspend`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.patch('/organizations/:id/suspend')`
- **Controller**: `suspendOrganization` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 15.7: updateSubscription
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/super-admin/organizations/:id/subscription`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/organizations/:id/subscription`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.patch('/organizations/:id/subscription')`
- **Controller**: `updateSubscription` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 15.8: updateFeatures
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/super-admin/organizations/:id/features`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/super-admin/organizations/:id/features`
- **Route File**: `backend/routes/superAdminRoutes.js`
- **Route Definition**: `router.patch('/organizations/:id/features')`
- **Controller**: `updateFeatures` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 16. Invitation APIs
#### API 16.1: validateInvitationToken
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/invitations/validate-token/:token`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations/validate-token/:token`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.get('/validate-token/:token')`
- **Controller**: `validateInvitationToken` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `token` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 16.2: getMyInvitations
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/invitations/my`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations/my`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.get('/my')`
- **Controller**: `getMyInvitations` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 16.3: acceptInvitationByToken
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/invitations/accept-by-token`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations/accept-by-token`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.post('/accept-by-token')`
- **Controller**: `acceptInvitationByToken` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 16.4: acceptInvitation
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/invitations/:id/accept`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations/:id/accept`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.post('/:id/accept')`
- **Controller**: `acceptInvitation` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 16.5: declineInvitation
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/invitations/:id/decline`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations/:id/decline`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.post('/:id/decline')`
- **Controller**: `declineInvitation` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 16.6: createInvitation
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/invitations`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.post('/')`
- **Controller**: `createInvitation` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `adminOnly, requireActiveOrg`
- **Authorization**: `Bearer JWT + Admin`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 16.7: getOrgInvitations
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/invitations/org`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations/org`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.get('/org')`
- **Controller**: `getOrgInvitations` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `adminOnly, requireActiveOrg`
- **Authorization**: `Bearer JWT + Admin`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 16.8: revokeInvitation
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/invitations/:id`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/invitations/:id`
- **Route File**: `backend/routes/invitationRoutes.js`
- **Route Definition**: `router.delete('/:id')`
- **Controller**: `revokeInvitation` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `adminOnly, requireActiveOrg`
- **Authorization**: `Bearer JWT + Admin`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
  - `x-organization-id: <ORGANIZATION_ID>` (required)
- **Path Parameters**:
  - `id` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 17. Googlecalendar APIs
#### API 17.1: initiateGoogleAuth
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/google/auth`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/auth`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.get('/auth')`
- **Controller**: `initiateGoogleAuth` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.2: googleCallback
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/google/callback`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/callback`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.get('/callback')`
- **Controller**: `googleCallback` in `backend/controllers/...`
- **Authentication**: `NO`
- **Authentication Middleware**: `None`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.3: getConnectionStatus
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/google/status`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/status`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.get('/status')`
- **Controller**: `getConnectionStatus` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.4: disconnectGoogleCalendar
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/google/disconnect`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/disconnect`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.delete('/disconnect')`
- **Controller**: `disconnectGoogleCalendar` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.5: getCalendars
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/google/calendars`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/calendars`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.get('/calendars')`
- **Controller**: `getCalendars` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.6: getEvents
- **Method**: `GET`
- **Complete URL**: `http://localhost:5000/api/google/events`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/events`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.get('/events')`
- **Controller**: `getEvents` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.7: createEvent
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/google/events`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/events`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.post('/events')`
- **Controller**: `createEvent` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.8: updateEvent
- **Method**: `PATCH`
- **Complete URL**: `http://localhost:5000/api/google/events/:eventId`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/events/:eventId`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.patch('/events/:eventId')`
- **Controller**: `updateEvent` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `eventId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 17.9: deleteEvent
- **Method**: `DELETE`
- **Complete URL**: `http://localhost:5000/api/google/events/:eventId`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/google/events/:eventId`
- **Route File**: `backend/routes/googleCalendarRoutes.js`
- **Route Definition**: `router.delete('/events/:eventId')`
- **Controller**: `deleteEvent` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `eventId` — `string` — `ID parameter for the resource`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `None`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

## 18. Livekit APIs
#### API 18.1: livekitController.generateToken
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/livekit/token`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/livekit/token`
- **Route File**: `backend/routes/livekitRoutes.js`
- **Route Definition**: `router.post('/token')`
- **Controller**: `livekitController.generateToken` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```

#### API 18.2: res
- **Method**: `POST`
- **Complete URL**: `http://localhost:5000/api/livekit/token`
- **Production URL**: `https://v-chat-production-aba4.up.railway.app/api/livekit/token`
- **Route File**: `backend/routes/livekitRoutes.js`
- **Route Definition**: `router.post('/token')`
- **Controller**: `res` in `backend/controllers/...`
- **Authentication**: `YES`
- **Authentication Middleware**: `protect, (req`
- **Authorization**: `Bearer JWT`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `None`
- **Query Parameters**:
  - `None`
- **Request Body**:
  - `data` — `object` — `optional` — `Request payload`
- **Valid Request Example**:
```json
{
  "example": "value"
}
```
