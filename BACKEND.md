# Todo Nest Backend

Backend API for todo/workspace management with NestJS + Prisma + PostgreSQL.

## Features

- Authentication: OTP qua email (đăng ký / quên mật khẩu), JWT access + refresh
- Profile management
- Workspace management + board / danh sách task có lọc & phân trang
- Task CRUD, task theo enum `TaskStatus` (PENDING, TODO, DONE, CANCEL), tìm kiếm, gắn label
- Dashboard thống kê
- Notifications (lưu DB + SSE realtime)
- Upload ảnh Cloudinary

## Cấu trúc dự án

```
todo-nest-be/
├── prisma/
│   └── schema.prisma          # Model & quan hệ database (Prisma)
├── src/
│   ├── main.ts                # Bootstrap: prefix `api`, ValidationPipe
│   ├── app.module.ts          # Gắn các module feature + Cloudinary + Mail
│   ├── app.controller.ts      # Route gốc
│   ├── common/                # Pagination, transformer dùng chung
│   ├── configs/
│   │   ├── database/          # PrismaModule / PrismaService
│   │   └── env/               # Đọc biến môi trường (port, JWT, SMTP, Cloudinary)
│   ├── modules/
│   │   ├── auth/              # Đăng ký, đăng nhập, OTP, refresh, logout
│   │   ├── profile/           # GET/PATCH profile (`/profiles/me`)
│   │   ├── workspace/         # Workspace + board + tasks có filter
│   │   ├── task/              # Task CRUD, search, list theo status
│   │   ├── label/             # Nhãn (màu + tên), phân trang
│   │   ├── dashboard/         # Tổng quan số liệu
│   │   └── notification/      # Danh sách có filter, đánh dấu đã xem, SSE stream
│   └── providers/
│       ├── cloudinary/        # Upload / xóa ảnh
│       └── mail/              # Gửi OTP qua SMTP
└── docker-compose.yml         # PostgreSQL local (tuỳ chọn)
```

## Thiết kế database (Prisma)

| Model | Mô tả |
|--------|--------|
| **Account** | Người dùng: `name`, `email` (unique), `password`, `refreshToken`, `avatar`, timestamp. Quan hệ: workspaces, tasks, labels, notifications. |
| **Workspace** | Không gian làm việc: `name`, `accountId`. Xóa workspace cascade tasks. |
| **Task** | `title`, `description`, `content`, `priority` (enum **Low \| Medium \| High**), `status` (enum **PENDING \| TODO \| DONE \| CANCEL**), `workspaceId`, `accountId`, `startTime`, `endTime`, `completedAt`, timestamp. Quan hệ: workspace, account, notifications; **nhiều-nhiều** với **Label**. |
| **Label** | Nhãn riêng theo user: `name`, `color`, `accountId`; gắn vào nhiều task. |
| **Notification** | `title`, `description`, `taskId` (nullable), `accountId`, `time`, `viewed`, `type` (chuỗi, ví dụ SYSTEM, COMPLETED, OVERDUE). |

Quan hệ chính: `Account 1—n Workspace / Task / Label / Notification`; `Workspace 1—n Task`; `Task n—n Label`.

## Local PostgreSQL with Docker

```bash
pnpm run db:up
```

Default DB from `docker-compose.yml`:

- Host: `localhost`
- Port: `5432`
- User: `admin`
- Password: `admin`
- Database: `todo`

## Environment

Create `.env` in project root:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/todo?schema=public"
PORT=5000

# JWT (tuỳ chọn — có default trong code khi thiếu)
JWT_ACCESS_SECRET="..."
JWT_REFRESH_SECRET="..."
JWT_ACCESS_EXPIRES_IN=900
JWT_REFRESH_EXPIRES_IN=604800

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# SMTP — gửi OTP đăng ký / reset mật khẩu
SMTP_HOST="..."
SMTP_PORT=587
SMTP_USER="..."
SMTP_PASS="..."
MAIL_FROM="..."
```

## Install and run

```bash
pnpm install
pnpm prisma:migrate
pnpm prisma:generate
pnpm start:dev
```

## API base URL

Prefix toàn cục: `/api`  
Ví dụ: `http://localhost:5000/api/...`

### Header xác thực (JWT)

Các route có ghi **Bearer** cần:

```http
Authorization: Bearer <accessToken>
```

---

## Tài liệu API (request / response)

Dưới đây là hợp đồng chính; lỗi nghiệp vụ trả về JSON Nest (`statusCode`, `message`, …) theo HTTP 400 / 401 / 404 / …

### Root

| Method | Path | Auth | Request | Response |
|--------|------|------|-----------|----------|
| GET | `/` | Không | — | Chuỗi `"Hello World!"` |

---

### Auth (`/api/auth`)

| Method | Path | Auth | Request body (JSON) | Response (JSON, thành công) |
|--------|------|------|----------------------|-----------------------------|
| POST | `/auth/signup/request-otp` | Không | `{ "name", "email", "password", "avatar?" }` — `name` ≥2 ký tự, `password` ≥6 | `{ "message": "OTP sent to your email for signup verification" }` |
| POST | `/auth/signup` | Không | `{ "email" }` — phải đã verify OTP đăng ký | Account tạo mới: `{ "id", "name", "email", "avatar", "createdAt" }` |
| POST | `/auth/login` | Không | `{ "email", "password" }` | `{ "id", "name", "email", "avatar", "accessToken", "refreshToken" }` |
| POST | `/auth/refresh-token` | Không | `{ "refreshToken" }` | `{ "accessToken", "refreshToken" }` |
| POST | `/auth/logout` | Bearer | — | `{ "message": "Logged out successfully" }` |
| POST | `/auth/forgot-password` | Không | `{ "email" }` | `{ "message": "OTP sent to your email for password reset" }` |
| POST | `/auth/verify-otp` | Không | `{ "email", "otp" }` — OTP 6 số; `{ "purpose": "SIGNUP" \| "RESET_PASSWORD" }` | `{ "message": "OTP verified successfully" }` |
| POST | `/auth/reset-password` | Không | `{ "email", "newPassword" }` — cần đã verify OTP reset | `{ "message": "Password updated successfully" }` |

Luồng đăng ký: `signup/request-otp` → `verify-otp` (purpose `SIGNUP`) → `signup` với `{ email }`.  
Luồng quên mật khẩu: `forgot-password` → `verify-otp` (`RESET_PASSWORD`) → `reset-password`.

---

### Profile (`/api/profiles`)

| Method | Path | Auth | Request | Response |
|--------|------|------|---------|----------|
| GET | `/profiles/me` | Bearer | — | `{ "id", "name", "email", "avatar", "createdAt" }` |
| PATCH | `/profiles/me` | Bearer | `{ "name?", "avatar?" }` | `{ "id", "name", "email", "avatar", "updatedAt" }` |

---

### Workspace (`/api/workspaces`)

| Method | Path | Auth | Request / Query | Response |
|--------|------|------|-----------------|----------|
| POST | `/workspaces` | Bearer | Body: `{ "name", "accountId" }` — **DTO yêu cầu** `accountId` (số nguyên); server ghi đè bằng user đăng nhập | `Workspace`: `{ "id", "name", "accountId", "createdAt", "updatedAt" }` |
| GET | `/workspaces` | Bearer | — | Mảng `Workspace` của user |
| GET | `/workspaces/:workspaceId/tasks/board` | Bearer | Query (tuỳ chọn): `search`, `labelIds` (mảng id), `startTimeFrom`, `startTimeTo`, `endTimeFrom`, `endTimeTo`, `priorities` (mảng `Low` \| `Medium` \| `High`) | `{ "columns": [ { "status": "PENDING"\|"TODO"\|"DONE"\|"CANCEL", "tasks": Task[] } ] }` — mỗi task có field `status` (enum), `labels` |
| GET | `/workspaces/:workspaceId/tasks` | Bearer | Phân trang: `page`, `pageSize` (10 \| 50 \| 100); cùng bộ filter như board | `{ "data": Task[], "metadata": PaginationMeta }` |
| PATCH | `/workspaces/:id` | Bearer | `{ "name" }` | `Workspace` đã sửa |
| DELETE | `/workspaces/:id` | Bearer | — | `Workspace` đã xóa; đồng thời cố xóa ảnh Cloudinary tham chiếu trong `content` task |

`PaginationMeta`: `{ "page", "pageSize", "totalPage", "total", "hasPreviousPage", "hasNextPage" }`.

---

### Task (`/api/task`)

| Method | Path | Auth | Request / Query | Response |
|--------|------|------|-----------------|----------|
| POST | `/task` | Bearer | Body: `{ "title", "content", "workspaceId", "accountId", "status?", "description?", "priority?", "startTime?", "endTime?", "labelIds?" }` — `status` ∈ `PENDING` \| `TODO` \| `DONE` \| `CANCEL` (mặc định **PENDING**); `priority` ∈ `Low` \| `Medium` \| `High`; **accountId** bắt buộc theo DTO nhưng server ghi đè từ JWT | `Task` (`status` là enum) + `workspace`, `labels` |
| GET | `/task` | Bearer | — | Mảng `Task` (kèm `workspace`, `labels`) |
| GET | `/task/status/:status/list` | Bearer | `:status` = một trong `PENDING`, `TODO`, `DONE`, `CANCEL` | Mảng `Task` theo status, sort `endTime` asc |
| GET | `/task/search/query` | Bearer | Query: `q` (chuỗi tìm), `workspaceId?` (số) | Mảng `Task` khớp title/description/content |
| GET | `/task/:id` | Bearer | — | `Task` + `workspace`, `notifications`, `labels` |
| PATCH | `/task/:id` | Bearer | Partial giống create; có thể đổi `status`, `labelIds` (set toàn bộ nhãn) | `Task` + `labels`, `workspace` |
| DELETE | `/task/:id` | Bearer | — | Bản ghi `Task` đã xóa |

---

### Label (`/api/labels`)

| Method | Path | Auth | Request / Query | Response |
|--------|------|------|-----------------|----------|
| POST | `/labels` | Bearer | `{ "name", "color" }` | `Label` |
| GET | `/labels` | Bearer | `page`, `pageSize` (10\|50\|100), `search?` | `{ "data": Label[], "metadata": PaginationMeta }` |
| PATCH | `/labels/:id` | Bearer | `{ "name?", "color?" }` | `Label` |
| DELETE | `/labels/:id` | Bearer | — | Xóa nếu không còn task gắn; ngược lại 400 |

---

### Dashboard (`/api/dashboard`)

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | `/dashboard/me/summary` | Bearer | `{ "totalTasks", "totalWorkspaces", "overdueTasks", "dueToday", "unreadNotifications", "byStatus": [ { "status": "PENDING"\|"TODO"\|"DONE"\|"CANCEL", "_count": { "_all": number } } ] }` |

---

### Notification (`/api/notifications`)

| Method | Path | Auth | Request / Query | Response |
|--------|------|------|-----------------|----------|
| GET | `/notifications` | Bearer | `page`, `pageSize`, `search?`, `viewed?` (boolean string), `type?`, `from?`, `to?` (ISO date) | `{ "data": Notification[], "metadata": PaginationMeta }` |
| PATCH | `/notifications/:id/viewed` | Bearer | — | `Notification` với `viewed: true` |
| GET (SSE) | `/notifications/stream` | Bearer | SSE — client cần gửi được header Bearer | Sự kiện: `{ "type": "notification", "data": { "accountId", "title", "description" } }` (đồng bộ với push realtime; chi tiết đầy đủ lấy qua `GET /notifications`) |

---

### Cloudinary (`/api/cloudinary`)

| Method | Path | Auth | Request | Response |
|--------|------|------|---------|----------|
| POST | `/cloudinary/upload/image` | Không | `multipart/form-data`: field **`file`** (ảnh, max ~5MB); optional **`folder`** | `{ "publicId", "url", "width", "height", "format" }` |
| POST | `/cloudinary/upload/images` | Không | **`files`** (tối đa 10), optional **`folder`** | Mảng object cùng shape như upload một ảnh |
| DELETE | `/cloudinary/image` | Không | JSON `{ "publicId" }` | `{ "publicId", "result": "ok" \| "not found" }` |

---

## Upload endpoints (Cloudinary) — tóm tắt

- `POST /api/cloudinary/upload/image` (form-data key: `file`)
- `POST /api/cloudinary/upload/images` (form-data key: `files`, max 10 files)
- `DELETE /api/cloudinary/image` (json body: `{ "publicId": "..." }`)
- Optional form-data field: `folder`
