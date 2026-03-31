# 📝 MegaBlog — Full-Stack React Blogging Platform

> A fully-featured blogging platform built with **React 19**, **Redux Toolkit**, **Appwrite BaaS**, and **TailwindCSS**. Users can register, log in, create/edit/delete blog posts with featured images, and browse all published content.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Available Scripts](#-available-scripts)
- [Routing](#-routing)
- [Application Architecture](#-application-architecture)
  - [State Management (Redux)](#state-management-redux)
  - [Appwrite Services](#appwrite-services)
  - [Authentication Flow](#authentication-flow)
- [Pages](#-pages)
- [Components](#-components)
  - [Layout Components](#layout-components)
  - [Form Components](#form-components)
  - [Utility Components](#utility-components)
- [Data Model (Appwrite)](#-data-model-appwrite)
- [File Storage (Appwrite)](#-file-storage-appwrite)
- [Configuration Layer](#-configuration-layer)
- [Deployment](#-deployment)
- [Known Limitations & Notes](#-known-limitations--notes)

---

## 🌐 Project Overview

**MegaBlog** is a single-page application (SPA) that provides a complete blogging experience:

- **Guests** can browse the home page (public posts shown only when authenticated).
- **Registered users** can log in, create, edit, and delete their own blog posts.
- **Post authors** see Edit/Delete controls only on their own posts.
- Posts have a **status** (`active` / `inactive`) — allowing draft mode.
- Each post has a **featured image** stored in Appwrite Storage and rendered through the Appwrite file preview API.

The project was built as a learning project to explore real-world React patterns including protected routes, Redux for global auth state, React Hook Form for form management, and Appwrite as a Backend-as-a-Service.

---

## 🛠 Tech Stack

| Category             | Technology                          | Version      |
|----------------------|--------------------------------------|--------------|
| UI Library           | React                                | ^19.2.4      |
| Build Tool           | Vite                                 | ^8.0.0       |
| State Management     | Redux Toolkit + React-Redux          | ^2.11.2 / ^9.2.0 |
| Routing              | React Router DOM                     | ^7.13.2      |
| Form Management      | React Hook Form                      | ^7.72.0      |
| Backend / Auth       | Appwrite (BaaS)                      | ^24.0.0      |
| Styling              | Tailwind CSS                         | ^3.4.3       |
| HTML Parser          | html-react-parser                    | ^5.2.17      |
| Linting              | ESLint (with React Hooks plugin)     | ^9.39.4      |
| PostCSS / Autoprefixer| postcss + autoprefixer              | ^8.5.8 / ^10.4.19 |

---

## 📁 Project Structure

```
projectreact/
│
├── public/                        # Static assets served by Vite
│
├── src/
│   ├── appwrite/                  # Appwrite service layer
│   │   ├── auth.js                # Authentication: register, login, logout, getCurrentUser
│   │   └── config.js              # Database & Storage: CRUD for posts + file operations
│   │
│   ├── config/
│   │   └── config.js              # Reads VITE_ env vars and exports as a typed config object
│   │
│   ├── store/                     # Redux state management
│   │   ├── store.js               # Configures the Redux store
│   │   └── authSlice.js           # Auth slice: login / logout reducers + state
│   │
│   ├── components/                # Reusable UI components
│   │   ├── index.js               # Central barrel export for all components
│   │   │
│   │   ├── header/
│   │   │   ├── header.jsx         # Top navigation bar (auth-aware nav items)
│   │   │   └── LogoutBtn.jsx      # Logout button wired to Appwrite + Redux
│   │   │
│   │   ├── footer/
│   │   │   └── footer.jsx         # Site footer with Company/Support/Legals links
│   │   │
│   │   ├── container/
│   │   │   └── Container.jsx      # Max-width wrapper for page content
│   │   │
│   │   ├── post-form/
│   │   │   └── PostForm.jsx       # Unified create/edit post form
│   │   │
│   │   ├── AuthLayout.jsx         # Route guard HOC (protected/public route wrapper)
│   │   ├── Button.jsx             # Reusable button with customisable colors
│   │   ├── Input.jsx              # ForwardRef input with label and auto-id
│   │   ├── Select.jsx             # ForwardRef select dropdown with label
│   │   ├── RTE.jsx                # Rich Text Editor (Controller-based textarea)
│   │   ├── Login.jsx              # Login form component
│   │   ├── Signup.jsx             # Signup/Registration form component
│   │   ├── Postcard.jsx           # Post thumbnail card (image + title + link)
│   │   └── logo.jsx               # Logo component (renders "MegaBlog" text)
│   │
│   ├── pages/                     # Route-level page components
│   │   ├── Home.jsx               # Landing page — fetches active posts grid
│   │   ├── AllPost.jsx            # All Posts page (authenticated users only)
│   │   ├── Post.jsx               # Single post view (with edit/delete for author)
│   │   ├── AddPost.jsx            # Add New Post page wrapper
│   │   ├── EditPost.jsx           # Edit Existing Post page wrapper
│   │   ├── Login.jsx              # Login page wrapper
│   │   └── Signup.jsx             # Signup page wrapper
│   │
│   ├── App.jsx                    # Root component — auth check + layout shell
│   ├── main.jsx                   # App entry point — Router + Redux Provider setup
│   ├── App.css                    # Minimal global styles
│   └── index.css                  # Base Tailwind imports (@tailwind base/components/utilities)
│
├── index.html                     # HTML shell / Vite entry
├── vite.config.js                 # Vite + React plugin config
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.cjs             # PostCSS config (autoprefixer)
├── eslint.config.js               # ESLint flat config
├── package.json                   # Dependencies and scripts
└── .env                           # Environment variables (NOT committed to git)
```

---

## ✨ Features

### Authentication
- **User Registration** — Create account with name, email, and password; auto-logs in on success.
- **User Login** — Email/password session using Appwrite's `createEmailPasswordSession`.
- **User Logout** — Deletes the current Appwrite session; clears Redux state.
- **Persistent Auth** — On app load, `App.jsx` calls `getCurrentUser()` to restore session from cookie.
- **Route Guards** — `AuthLayout` component protects authenticated routes and redirects unauthenticated users to `/login`.

### Blog Post Management
- **Create Post** — Rich form with title (auto-generates URL slug), HTML content editor, featured image upload, and status selector.
- **Read / Browse Posts** — Home page shows all `active` posts in a card grid; AllPosts shows all statuses.
- **View Single Post** — Full-page view with featured image, parsed HTML content.
- **Edit Post** — Pre-filled form; optionally replace featured image (old file deleted from storage).
- **Delete Post** — Removes Appwrite database document AND associated storage file.

### Access Control
- **Author-only Controls** — Edit and Delete buttons only appear on posts created by the currently logged-in user (`post.userId === userData.$id`).
- **Status Filtering** — Home page queries only `status === "active"` posts by default; AllPost page bypasses filter.

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
VITE_APPWRITE_URL="https://sgp.cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="articles"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
```

> ⚠️ **Never commit `.env` to version control.** The `.gitignore` already excludes it.

| Variable                     | Description                                         |
|------------------------------|-----------------------------------------------------|
| `VITE_APPWRITE_URL`          | Appwrite API endpoint URL                           |
| `VITE_APPWRITE_PROJECT_ID`   | Your Appwrite project ID                            |
| `VITE_APPWRITE_DATABASE_ID`  | Appwrite database ID containing the articles collection |
| `VITE_APPWRITE_COLLECTION_ID`| Collection name/ID for blog posts (`articles`)      |
| `VITE_APPWRITE_BUCKET_ID`    | Appwrite storage bucket ID for featured images      |

All variables are prefixed with `VITE_` so Vite exposes them to the browser via `import.meta.env`.

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x
- An **Appwrite** project with:
  - A database + `articles` collection
  - A storage bucket
  - Email/Password authentication enabled

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd projectreact

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Copy the example below into a new .env file and fill in your values
cp .env.example .env   # or create manually

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

### Appwrite Setup Guide

1. Go to [Appwrite Console](https://cloud.appwrite.io/) and create a new project.
2. Navigate to **Auth** → Enable **Email/Password** sign-in.
3. Navigate to **Databases** → Create a database → Create a collection named `articles`.
4. In the `articles` collection, add the following attributes:

   | Attribute      | Type    | Required | Notes                         |
   |----------------|---------|----------|-------------------------------|
   | `title`        | String  | Yes      | Max 255 chars                 |
   | `content`      | String  | No       | Large string / HTML content   |
   | `featuredimage`| String  | No       | Appwrite file ID              |
   | `status`       | String  | Yes      | `"active"` or `"inactive"`   |
   | `userId`       | String  | Yes      | Appwrite user `$id`           |

5. Set **Document Security** so users can read/write their own documents.
6. Navigate to **Storage** → Create a bucket → Copy the bucket ID to `.env`.

---

## 📜 Available Scripts

```bash
npm run dev       # Start Vite dev server (hot reload)
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint on all source files
```

---

## 🔗 Routing

Configured in `src/main.jsx` using **React Router v7** `createBrowserRouter`:

| Path               | Page Component | Auth Required | Notes                                 |
|--------------------|----------------|---------------|---------------------------------------|
| `/`                | `Home`         | ❌ No          | Shows active posts; prompts login if empty |
| `/login`           | `Login`        | ❌ No (redirect to `/` if logged in) | Login form |
| `/signup`          | `Signup`       | ❌ No (redirect to `/` if logged in) | Registration form |
| `/all-posts`       | `AllPost`      | ✅ Yes         | All posts regardless of status        |
| `/add-post`        | `AddPost`      | ✅ Yes         | Create new post form                  |
| `/edit-post/:slug` | `EditPost`     | ✅ Yes         | Edit existing post by slug/ID         |
| `/post/:slug`      | `Post`         | ❌ No          | Public post view (edit/delete for author) |

All routes are children of the root `App` layout component, which renders `<Header>`, `<Outlet>`, and `<Footer>`.

---

## 🏗 Application Architecture

### State Management (Redux)

**Store** (`src/store/store.js`):
```js
configureStore({ reducer: { auth: authReducer } })
```

**Auth Slice** (`src/store/authSlice.js`):

| State Key   | Type    | Default | Description                       |
|-------------|---------|---------|-----------------------------------|
| `status`    | Boolean | `false` | Whether a user is logged in       |
| `userData`  | Object  | `null`  | Appwrite user account object      |

| Action     | Payload              | Effect                             |
|------------|----------------------|------------------------------------|
| `login`    | `{ userData }`       | Sets `status = true`, stores user  |
| `logout`   | none                 | Sets `status = false`, clears user |

Components access auth state via:
```js
const authStatus = useSelector(state => state.auth.status)
const userData   = useSelector(state => state.auth.userData)
```

---

### Appwrite Services

#### `src/appwrite/auth.js` — `AuthService` class

| Method              | Parameters                     | Returns              | Description                        |
|---------------------|--------------------------------|----------------------|------------------------------------|
| `createAccount()`   | `{ email, password, name }`    | Session or throws    | Creates account, then auto-logins  |
| `login()`           | `{ email, password }`          | Session object       | Creates email/password session     |
| `getCurrentUser()`  | none                           | User object or null  | Gets current authenticated user    |
| `logout()`          | none                           | void                 | Deletes current Appwrite session   |

A singleton instance `authService` is exported as default.

#### `src/appwrite/config.js` — `Service` class

| Method              | Parameters                                          | Returns          | Description                             |
|---------------------|-----------------------------------------------------|------------------|-----------------------------------------|
| `createPost()`      | `{ title, slug, content, featuredimage, status, userId }` | Document   | Creates a new post document in Appwrite DB |
| `updatePost()`      | `slug, { title, content, featuredimage, status }`   | Document         | Updates an existing post document       |
| `deletePost()`      | `slug`                                              | `true/false`     | Deletes a post document by ID/slug      |
| `getPost()`         | `slug`                                              | Document or null | Fetches a single post by its ID/slug    |
| `getPosts()`        | `queries[]` (default: `status === "active"`)        | Documents list   | Lists posts with optional query filters |
| `uploadFile()`      | `file`                                              | File object      | Uploads file to Appwrite Storage bucket |
| `deleteFile()`      | `fileId`                                            | `true/false`     | Deletes a file from Appwrite Storage    |
| `getFilePreview()`  | `fileId`                                            | URL string/object| Returns a preview URL for a stored file |

A singleton instance `service` is exported as default.

---

### Authentication Flow

```
App mounts
  └─► App.jsx: useEffect → authService.getCurrentUser()
        ├─► User exists → dispatch(login({ userData }))
        └─► No user     → dispatch(logout())
              └─► setLoading(false) → renders layout

User clicks Login
  └─► Login.jsx: handleSubmit → authService.login(data)
        └─► authService.getCurrentUser()
              └─► dispatch(authLogin({ userData }))
                    └─► navigate('/')

User clicks Signup
  └─► Signup.jsx: handleSubmit → authService.createAccount(data)
        └─► auto-calls authService.login()
              └─► authService.getCurrentUser()
                    └─► dispatch(login({ userData: currentUser }))
                          └─► navigate('/')

User clicks Logout
  └─► LogoutBtn: logoutHandler → authService.logout()
        └─► dispatch(logout())
```

---

## 📄 Pages

### `Home.jsx`
- Fetches posts where `status === "active"` on mount.
- Renders posts as a 4-column card grid using `<Postcard />`.
- Shows "Login to read posts" message when no posts are found.

### `AllPost.jsx`
- **Protected** — only accessible when authenticated.
- Fetches all posts (no status filter: `getPosts([])`).
- Same 4-column card grid layout as Home.

### `Post.jsx`
- Reads `:slug` from URL params and fetches the post from Appwrite.
- Displays featured image and HTML-parsed post content.
- If the logged-in user is the post author → shows **Edit** and **Delete** buttons.
- Delete action: removes document from DB + deletes the featured image file.

### `AddPost.jsx`
- **Protected** — renders `<PostForm />` without a pre-existing post (creates new).

### `EditPost.jsx`
- **Protected** — reads `:slug` from URL, fetches the post, passes it to `<PostForm post={...} />`.
- Redirects to `/` if post not found.

### `Login.jsx` (page)
- Thin wrapper around the `<Login />` component.

### `Signup.jsx` (page)
- Thin wrapper around the `<Signup />` component.

---

## 🧩 Components

### Layout Components

#### `Header` (`src/components/header/header.jsx`)
- Reads `authStatus` from Redux to conditionally render nav items.
- **Unauthenticated nav**: Home, Login, Signup
- **Authenticated nav**: Home, All Posts, Add Post, Logout button
- Uses `useNavigate` for programmatic navigation on button clicks.

#### `Footer` (`src/components/footer/footer.jsx`)
- Static footer with **Company**, **Support**, and **Legals** link sections.
- Uses `<Link>` for SPA navigation.
- Displays "© Copyright 2023. All Rights Reserved by DevUI."

#### `Container` (`src/components/container/Container.jsx`)
- Simple wrapper: `<div className="w-full max-w-7xl mx-auto px-4">`. Constrains content width on large screens.

#### `AuthLayout` (`src/components/AuthLayout.jsx`)
- **Route Guard HOC**: wraps any route to control access.
- `authentication={true}` (default) → redirects to `/login` if not logged in.
- `authentication={false}` → redirects to `/` if already logged in (for `/login`, `/signup`).
- Shows `"Loading....."` text while evaluating auth status.

---

### Form Components

#### `Login` (`src/components/Login.jsx`)
- Email + password form using `react-hook-form`.
- Validates email format via regex.
- Calls `authService.login()`, then dispatches Redux `login` action.
- Links to `/signup`.

#### `Signup` (`src/components/Signup.jsx`)
- Name, email, and password registration form.
- Calls `authService.createAccount()` which auto-logs in on success.
- Links to `/login`.

#### `PostForm` (`src/components/post-form/PostForm.jsx`)
- **Dual-purpose form**: Create (no `post` prop) or Edit (with `post` prop).
- Fields:
  - **Title** — required, triggers automatic slug generation
  - **Slug** — auto-generated from title (lowercase, hyphens, alphanumeric); editable
  - **Content** — managed by `<RTE />` via `react-hook-form` `Controller`
  - **Featured Image** — file input (required on create, optional on edit)
  - **Status** — dropdown: `active` | `inactive`
- On submit (create):
  1. Upload image to Appwrite Storage
  2. Set `featuredimage` to returned file `$id`
  3. Create Appwrite document with `userId` from Redux state
  4. Navigate to `/post/<new-id>`
- On submit (edit):
  1. Upload new image (if provided) and delete old one
  2. Update Appwrite document
  3. Navigate to `/post/<id>`

---

### Utility Components

#### `Button` (`src/components/Button.jsx`)
- Configurable via `bgColor` (default: `bg-blue-600`), `textColor` (default: `text-white`), `className`, and `type` props.
- Spreads remaining props onto `<button>`.

#### `Input` (`src/components/Input.jsx`)
- `forwardRef` component with auto-generated `id` via `useId()`.
- Renders a `<label>` + `<input>` pair; integrates seamlessly with `react-hook-form` via `register()`.

#### `Select` (`src/components/Select.jsx`)
- `forwardRef` component with auto-generated `id` via `useId()`.
- Accepts `options` array and renders `<option>` elements.
- Integrates with `react-hook-form` via `register()`.

#### `RTE` (`src/components/RTE.jsx`)
- Simple `Controller`-based rich text area (textarea).
- Controlled via `react-hook-form` `<Controller>` — receives `control`, `name`, and `defaultValue`.
- Note: Designed to be replaced with TinyMCE (`@tinymce/tinymce-react`) if a full WYSIWYG editor is needed.

#### `Postcard` (`src/components/Postcard.jsx`)
- Displays a post preview: featured image + title, wrapped in a `<Link>` to `/post/<id>`.
- Calls `appwriteService.getFilePreview(featuredimage)` for the image URL.

#### `Logo` (`src/components/logo.jsx`)
- Renders the text **"MegaBlog"** as the site logo. Accepts a `width` prop for flexible sizing.

#### `LogoutBtn` (`src/components/header/LogoutBtn.jsx`)
- Calls `authService.logout()` then dispatches Redux `logout()` action.
- Styled as a nav-consistent button.

---

## 🗃 Data Model (Appwrite)

**Collection**: `articles`

| Field          | Type   | Required | Description                              |
|----------------|--------|----------|------------------------------------------|
| `title`        | String | Yes      | Post title                               |
| `content`      | String | No       | HTML or plain text content of the post   |
| `featuredimage`| String | No       | Appwrite Storage file `$id`              |
| `status`       | String | Yes      | `"active"` or `"inactive"` (draft)       |
| `userId`       | String | Yes      | `$id` of the Appwrite user who created it|

Appwrite auto-generates `$id`, `$createdAt`, `$updatedAt` metadata fields.

The document's **`$id` acts as the URL slug** (used in `/post/:slug` and `/edit-post/:slug`).

---

## 🗂 File Storage (Appwrite)

Featured images for posts are stored in an Appwrite Storage **Bucket**.

| Operation       | Method                       | Notes                                          |
|-----------------|------------------------------|------------------------------------------------|
| Upload          | `bucket.createFile()`        | Generates a unique file ID (`ID.unique()`)     |
| Preview URL     | `bucket.getFilePreview()`    | Returns a renderable URL for `<img src>`       |
| Delete          | `bucket.deleteFile()`        | Called when a post is deleted or image replaced|

The `featuredimage` field in the database stores the file's `$id`, not the full URL. The URL is generated at render time via `getFilePreview(fileId)`.

---

## ⚙️ Configuration Layer

**`src/config/config.js`** — reads all environment variables and exports a single typed configuration object:

```js
const config = {
    appwriteUrl:          String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:    String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:   String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:     String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default config
```

Both `auth.js` and `config.js` (service layer) import from this config object — environment variables are never accessed directly in service files.

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Outputs to `dist/` directory. Deploy to any static host:

- **Vercel**: Connect repo, set env vars in Vercel dashboard, auto-detects Vite.
- **Netlify**: Drag `dist/` folder or connect repo; configure Publish directory as `dist`.
- **GitHub Pages**: Use `vite-plugin-gh-pages` or manually upload `dist/`.

> ⚠️ For any static host, configure redirects so all routes return `index.html` (required for client-side routing).
> - Netlify: Add `_redirects` file: `/* /index.html 200`
> - Vercel: Add `vercel.json` with rewrites config.

### Environment Variables in Production

Set the same `VITE_*` variables in your hosting provider's environment settings. They will be inlined into the built JS bundle by Vite at build time.

---

## ⚠️ Known Limitations & Notes

1. **RTE is a plain textarea** — The rich text editor (`RTE.jsx`) currently renders a simple `<textarea>`. To enable full WYSIWYG editing, install and configure `@tinymce/tinymce-react` and update `RTE.jsx`.

2. **No pagination** — `getPosts()` returns all matching documents. For large datasets, add Appwrite Query `limit`/`offset` pagination.

3. **No image preview before upload** — The post form does not show a live preview of a newly selected image before submission.

4. **Public post visibility** — The `/post/:slug` route is not protected by `AuthLayout`, meaning anyone with a direct URL can view a post. This may be intentional for shareable links.

5. **Slug = Document ID** — The post slug is also the Appwrite document `$id`. The slug is auto-generated from the title at creation time (lowercase, hyphens). It cannot be changed after creation.

6. **No image size validation** — File uploads currently do not enforce client-side size/type limits beyond the `accept` attribute on the file input.

7. **Error handling** — Service-level errors are logged to console. The UI only shows errors for authentication forms; post operation errors are silent to the user.

---

## 👤 Author

Built by **Pratik** as a full-stack React + Appwrite learning project.

---

## 📃 License

This project is for educational purposes. No license specified.
