# URL Shortener Service with Analytics Dashboard

## 1. Tech Choices

**Cloud Platform:**  
- AWS (Elastic Beanstalk for Node.js) — Easy deployment, scaling, and integrates well with MongoDB (via Atlas).

**Database:**  
- MongoDB (Atlas) — Perfect for flexible document storage, and we can extend it later for analytics data.

**Backend:**  
- Node.js with Express — Lightweight and great for building APIs quickly.

**Frontend:**  
- Next.js — Great for SEO (if you want your shortened URLs to rank) and has server-side rendering for faster load times.

---

## 2. Data Flow Explanation

1️⃣ **User submits URL** → Form sends data to the backend.

2️⃣ **Backend generates short URL** (random string or hash of URL) → Saves to MongoDB with click count (0) and geolocation placeholder data.

3️⃣ **User receives shortened URL** → Displayed on the frontend.

4️⃣ **When someone visits the short URL:**
   - Backend looks up the original URL.
   - Redirects the user.
   - Increments click count and stores geolocation (via IP lookup API).

5️⃣ **Analytics dashboard** → Fetches data from the database and shows click counts + geolocation breakdown.

---

## 3. API Design

| **Endpoint**     | **Method** | **Purpose**                                                |
|-------------------|------------|------------------------------------------------------------|
| `/shortUrls`      | POST       | Accepts full URL, returns shortened URL.                   |
| `/:shortUrl`      | GET        | Redirects to full URL, increments click count, stores IP/geolocation. |
| `/api/analytics`  | GET        | Returns click counts + geolocation data (for dashboard).   |
| `/api/urls`       | DELETE     | Clears all saved URLs (admin function).                    |

---

## 4. Performance Optimization Strategies

- **Caching:** Store frequently accessed URLs in memory (e.g., Redis) to avoid hitting the database every time a link is clicked. This speeds up redirections significantly.
- **Database Indexing:** Ensure the "short URL" field is indexed so lookups are faster — especially useful when handling thousands of entries.
- **Backend Efficiency:** Use multiple backend instances or processes (via clustering or load balancers) to handle more traffic without slowing down.

---

## 5. Scalability Strategies

- **Auto-scaling:** If traffic spikes, deploy the backend on a cloud platform (like AWS or GCP) with auto-scaling enabled to spin up more servers when needed.
- **Database Sharding:** For large datasets, split the database into smaller, manageable parts distributed across multiple servers.
- **Content Delivery Network (CDN):** Deploy the frontend to a CDN (e.g., Vercel or Cloudflare) to ensure faster load times globally.

---

## 6. Error Handling Strategies

- **Input Validation:** Ensure users submit only valid URLs to prevent errors or misuse.
- **Graceful Failures:** If a short link doesn’t exist, show a custom error page (instead of a generic browser error) to maintain a clean user experience.
- **API Resilience:** If external services (like geolocation) fail, handle the failure smoothly — either by retrying or falling back to a default response.
- **Global Error Handling:** Set up a centralized error management system that logs errors and responds to users with a friendly error message without crashing the app.



