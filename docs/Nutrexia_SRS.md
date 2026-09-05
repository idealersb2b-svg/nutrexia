# Software Requirements Specification

## NUTREXIA — D2C E-Commerce Web Application

*Responsive Web App / PWA on a shared Node.js backend and PostgreSQL database*

| | |
|---|---|
| **Prepared for** | Nutrexia — Client Review |
| **Prepared by** | CM-eServices (a digital studio of IDEALERS B2B PVT LTD) |
| **Document type** | Software Requirements Specification (SRS) |
| **Source document** | Nutrexia D2C Web App Proposal — Technical Specification |
| **Version** | 1.0 (Draft for Discovery) |
| **Status** | Draft — final requirements to be confirmed during discovery & UI/UX approval |

> **Note on derivation:** This SRS translates the commercial proposal prepared by CM-eServices into a structured requirements specification (IEEE 830 / ISO-style format) to guide design, development and acceptance testing. Where the proposal recommended an option (e.g. Redis, NestJS), this document lists it as a recommended choice rather than a mandatory constraint, unless stated otherwise.

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   - 1.4 [References](#14-references)
   - 1.5 [Overview](#15-overview)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)
3. [Functional Requirements](#3-functional-requirements)
   - 3.1 [Customer-Facing Pages](#31-customer-facing-pages)
   - 3.2 [Core E-Commerce Functionality](#32-core-e-commerce-functionality)
   - 3.3 [Product Detail Experience](#33-product-detail-experience)
   - 3.4 [Subscription System](#34-subscription-system)
   - 3.5 [Customer Account](#35-customer-account)
   - 3.6 [Admin Panel](#36-admin-panel)
   - 3.7 [Inventory & Batch Traceability](#37-inventory--batch-traceability)
4. [External Interface Requirements](#4-external-interface-requirements)
   - 4.1 [User Interfaces](#41-user-interfaces)
   - 4.2 [Hardware Interfaces](#42-hardware-interfaces)
   - 4.3 [Software Interfaces](#43-software-interfaces)
   - 4.4 [Communication Interfaces](#44-communication-interfaces)
5. [Non-Functional Requirements](#5-non-functional-requirements)
   - 5.1 [Performance](#51-performance)
   - 5.2 [SEO](#52-seo)
   - 5.3 [Security](#53-security)
   - 5.4 [PWA / Mobile Web Strategy](#54-pwa--mobile-web-strategy)
   - 5.5 [Reliability, Availability and Maintainability](#55-reliability-availability-and-maintainability)
   - 5.6 [Compatibility / Extensibility](#56-compatibility--extensibility)
6. [System Architecture](#6-system-architecture)
7. [Data Model (Suggested)](#7-data-model-suggested)
8. [Technology Stack](#8-technology-stack)
   - 8.1 [Analytics Event Requirements](#81-analytics-event-requirements)
9. [Implementation Phases](#9-implementation-phases)
10. [MVP Launch Scope and Future Expansion](#10-mvp-launch-scope-and-future-expansion)
    - 10.1 [MVP Launch Scope](#101-mvp-launch-scope)
    - 10.2 [Future Expansion (Post-MVP)](#102-future-expansion-post-mvp)
    - 10.3 [Key Business Benefits of the Single-Web-App Approach](#103-key-business-benefits-of-the-single-web-app-approach)
11. [Client Inputs Required Before Development](#11-client-inputs-required-before-development)
12. [Content & Compliance Note](#12-content--compliance-note)
13. [Acceptance and Sign-off](#13-acceptance-and-sign-off)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for the Nutrexia Direct-to-Consumer (D2C) e-commerce platform. It is intended to guide the design, development, testing and acceptance of the system by CM-eServices on behalf of Nutrexia, and to serve as a shared reference between the client and the development team throughout the engagement.

### 1.2 Scope

The system in scope is a single responsive Web Application, installable as a Progressive Web App (PWA), covering the full D2C customer journey (browsing, cart, checkout, payment, order tracking, subscriptions, reviews) together with a backend commerce API and an administrative panel for catalogue, order, inventory and content management.

**In scope:**
- Customer-facing responsive storefront (desktop, tablet, mobile, installable PWA).
- Node.js/NestJS commerce API and PostgreSQL database as the system of record.
- Payment processing via Razorpay and shipping/fulfilment via Shiprocket (or equivalent).
- Subscription commerce, customer accounts, reviews, coupons and an admin panel.
- Batch-level inventory traceability suited to a packaged nutrition product.

**Out of scope (for MVP):**
- A native React Native mobile application (deferred to a future phase, if justified).
- Loyalty/rewards, referral programmes, gift cards and advanced marketing automation (see Section 10).
- Independent verification of health, nutrition, lab-testing or compliance claims — these are treated as client-supplied content (see Section 12).

### 1.3 Definitions, Acronyms and Abbreviations

| Term | Definition |
|---|---|
| D2C | Direct-to-Consumer — selling directly to end customers without an intermediary retailer. |
| PWA | Progressive Web App — a web application that can be installed on a device and behave like a native app. |
| SRS | Software Requirements Specification — this document. |
| MVP | Minimum Viable Product — the initial launch scope defined in Section 9. |
| SKU | Stock Keeping Unit — a unique identifier for a distinct product/variant. |
| COA | Certificate of Analysis — a lab document confirming product test results. |
| SSR / SSG | Server-Side Rendering / Static Site Generation — Next.js rendering strategies used for SEO and performance. |
| ORM | Object-Relational Mapping — Prisma is the ORM used for type-safe database access. |
| RBAC | Role-Based Access Control — permission model for the admin panel. |
| GA4 | Google Analytics 4 — the analytics platform used for conversion tracking. |

### 1.4 References

- Nutrexia D2C Web App Proposal (Client Proposal / Technical Specification), prepared by CM-eServices.
- Nutrexia baseline HTML — supplied reference design and content (landing page, shop, formulation, story, climate impact, testimonials, FAQ, newsletter/waitlist, cart drawer).
- Razorpay API and webhook documentation.
- Shiprocket (or equivalent courier aggregator) API documentation.

### 1.5 Overview

Section 2 describes the product at a high level. Sections 3–4 specify functional and interface requirements by feature area. Section 5 specifies non-functional requirements. Sections 6–8 describe the architecture, data model and technology stack. Sections 9–13 cover delivery scope, phasing, dependencies and compliance considerations.

---

## 2. Overall Description

### 2.1 Product Perspective

Nutrexia is a new, standalone D2C commerce platform built around one responsive frontend rather than separate web and native applications. The same Next.js application serves desktop, tablet and mobile browsers and can additionally be installed as a PWA. All commerce logic, pricing, inventory and orders are owned by a single Node.js/NestJS backend API backed by PostgreSQL, so the storefront never holds business logic or trusted pricing/state on the client.

The architecture is intentionally designed so that a native Android/iOS application could be added later without replacing the backend (see Section 6 and Section 10).

### 2.2 Product Functions

At a high level, the system shall provide:
- A conversion-focused, SEO-friendly storefront for browsing and purchasing Nutrexia products.
- Cart, checkout, payment and order management, including guest and authenticated flows.
- A recurring subscription commerce engine (create, pause, resume, cancel, modify).
- Customer account self-service (profile, addresses, orders, wishlist, subscriptions, reviews).
- An administrative panel for catalogue, inventory, orders, customers, content, coupons and reviews.
- Batch-level inventory and traceability records for regulatory and quality purposes.
- Analytics and event tracking to support marketing measurement and future automation.

### 2.3 User Classes and Characteristics

| User Class | Description |
|---|---|
| Guest Shopper | Unauthenticated visitor who can browse, add to a guest cart/wishlist, and check out; not required to register before purchasing. |
| Registered Customer | Authenticated user with a saved profile, addresses, order history, wishlist, subscriptions and reviews; guest cart is merged into the account on login. |
| Subscriber | A Registered Customer with one or more active recurring subscriptions requiring ongoing billing/renewal management. |
| Store Administrator / Staff | Internal Nutrexia/CM-eServices user managing catalogue, orders, inventory, content, coupons and reviews through the Admin Panel, subject to role-based permissions. |
| System Integrator (Payment/Shipping) | External services (Razorpay, Shiprocket) that interact with the backend via API/webhook, not through the UI. |

### 2.4 Operating Environment

- Client: modern evergreen browsers (Chrome, Safari, Edge, Firefox) on desktop, tablet and mobile, including installed PWA mode on supporting Android/iOS/desktop platforms.
- Server: Node.js runtime hosting the NestJS API; PostgreSQL as the primary datastore; Redis recommended for caching, rate-limiting and background jobs.
- Storage/CDN: S3-compatible object storage with a CDN layer for product images, documents and lab reports.
- Third-party services: Razorpay (payments), Shiprocket or equivalent (shipping/fulfilment), GA4 and Meta (analytics/marketing).

### 2.5 Design and Implementation Constraints

- Single responsive frontend approach for MVP — no separate native mobile app at launch.
- The supplied Nutrexia baseline HTML is the visual/content starting point for the homepage and must be re-implemented with dynamic, backend-driven data rather than hardcoded/demo content.
- Founding-price messaging, countdown/stock presentation and comparison content must be implemented as configurable content, not hardcoded values.
- All monetary calculations (cart totals, discounts, taxes, shipping) must be computed and validated server-side; the client must never be the source of truth for price or stock.
- Prisma is the mandated ORM for PostgreSQL access, to keep schema/migrations type-safe and consistent.
- All health, nutrition, allergen, lab-testing and climate/performance content is client-supplied and pending legal/regulatory review (see Section 12); the system must support content updates without a code deployment.

### 2.6 Assumptions and Dependencies

- Nutrexia will supply final branding, product/SKU data, pricing, imagery, nutrition/compliance content and policy documents before the relevant build phases (see Section 11).
- Nutrexia will provide/verify a Razorpay merchant account and a shipping-provider account with API access before the payments and shipping phases.
- Implementation phase durations (Section 9) are planning estimates dependent on content readiness, third-party onboarding and client feedback cycles.
- Push notifications are dependent on browser/device support and explicit user permission, and are not guaranteed on all platforms.

---

## 3. Functional Requirements

Requirements are grouped by feature area and given a unique ID for traceability. Priority: **M** = Must-have (MVP), **S** = Should-have, **C** = Could-have (post-MVP).

### 3.1 Customer-Facing Pages

The storefront shall provide the following routes/pages:

| Route | Purpose |
|---|---|
| `/` | Conversion-focused homepage based on the approved Nutrexia baseline design. |
| `/shop` | Product listing and catalogue, with filtering as applicable. |
| `/product/[slug]` | Full product detail and purchase experience. |
| `/collections` | Future-ready category/collection structure. |
| `/our-story` | Brand and founder story. |
| `/nutrition` | Nutrition, ingredients and formulation information. |
| `/lab-reports` | Lab reports, safety documentation and certifications. |
| `/climate-impact` | Climate and sustainability content. |
| `/reviews` | Customer reviews and social proof. |
| `/faq` | Frequently asked questions. |
| `/contact` | Customer support / contact. |
| `/blog` | Future content and SEO marketing. |
| `/cart` | Cart and checkout entry point. |
| `/checkout` | Address, delivery, discount and payment collection. |
| `/account` | Customer profile, orders, addresses, wishlist and subscriptions. |
| `/track-order` | Order tracking. |
| Policy pages | Shipping, returns/refunds, cancellation, privacy and terms. |

### 3.2 Core E-Commerce Functionality

| Req ID | Description | Priority |
|---|---|:---:|
| FR-3.2.1 | The frontend shall communicate with a single Node.js commerce API for all catalogue, cart, order and account data. | M |
| FR-3.2.2 | PostgreSQL shall be the system of record for products, prices, customers, orders, inventory and subscriptions. | M |
| FR-3.2.3 | Payment and shipping providers shall be integrated at the backend so that provider changes do not require storefront changes. | M |
| FR-3.2.4 | The system shall maintain a product catalogue including products, variants, images, pricing, sale pricing, nutrition, ingredients, stock and SEO metadata. | M |
| FR-3.2.5 | The system shall support a guest cart and an authenticated cart, merging the guest cart into the customer's account upon login. | M |
| FR-3.2.6 | The system shall support a wishlist / "save for later" function for registered customers. | M |
| FR-3.2.7 | The system shall provide a coupon and discount engine applicable at cart/checkout. | M |
| FR-3.2.8 | The system shall support a free-shipping threshold and shipping cost calculation. | M |
| FR-3.2.9 | Checkout totals (price, discount, tax, shipping) shall be calculated and verified server-side; client-submitted totals shall never be trusted. | M |
| FR-3.2.10 | The system shall integrate Razorpay for payment, including server-side signature verification and webhook handling. | M |
| FR-3.2.11 | The system shall generate order confirmations and invoices/receipts, and maintain customer order history. | M |
| FR-3.2.12 | The system shall integrate with a shipping provider for pincode serviceability, label generation, shipment creation and tracking. | M |
| FR-3.2.13 | The system shall support returns, cancellations and refund workflows. | M |

### 3.3 Product Detail Experience

| Req ID | Description | Priority |
|---|---|:---:|
| FR-3.3.1 | The product detail page shall display a product image gallery with zoom. | M |
| FR-3.3.2 | The product detail page shall display name, rating, pricing, MRP/discount and per-serving economics. | M |
| FR-3.3.3 | The system shall support variant/flavour/pack selection where applicable. | M |
| FR-3.3.4 | The product detail page shall provide quantity selection with Add to Cart and Buy Now actions. | M |
| FR-3.3.5 | The product detail page shall offer a subscription purchase option alongside one-time purchase. | M |
| FR-3.3.6 | The product detail page shall present benefits, ingredients, nutrition facts, usage instructions and allergen/safety information. | M |
| FR-3.3.7 | The product detail page shall surface applicable lab reports and certifications. | M |
| FR-3.3.8 | The product detail page shall display reviews with verified-purchase indicators, and related/recommended products. | M |

### 3.4 Subscription System

Subscriptions shall be implemented as a first-class commerce object, not a static product-card representation.

| Req ID | Description | Priority |
|---|---|:---:|
| FR-3.4.1 | Customers shall be able to create, pause, resume and cancel a subscription from their account. | M |
| FR-3.4.2 | Customers shall be able to change subscription quantity, delivery frequency, delivery address and eligible product/variant. | M |
| FR-3.4.3 | The account shall display next billing/renewal date and shipment information for each subscription. | M |
| FR-3.4.4 | The system shall store subscription status and payment references for each billing cycle. | M |
| FR-3.4.5 | The subscription engine shall support founding-price rules where commercially applicable, without hardcoding them into the frontend. | S |

### 3.5 Customer Account

| Req ID | Description | Priority |
|---|---|:---:|
| FR-3.5.1 | The system shall support customer registration and secure login. | M |
| FR-3.5.2 | Customers shall be able to manage profile and contact information, and store multiple saved addresses. | M |
| FR-3.5.3 | Customers shall be able to view a list of orders and drill into order detail and shipment tracking. | M |
| FR-3.5.4 | Customers shall be able to manage a wishlist and their subscriptions from the account area. | M |
| FR-3.5.5 | Customers shall be able to submit product reviews. | M |
| FR-3.5.6 | Customers shall be able to manage notification preferences. | S |

### 3.6 Admin Panel

| Req ID | Description | Priority |
|---|---|:---:|
| FR-3.6.1 | The admin panel shall provide a dashboard summarising sales, orders, customers, products, subscriptions and inventory. | M |
| FR-3.6.2 | The admin panel shall support product management: variants, pricing, images, nutrition, ingredients, SEO metadata and publication status. | M |
| FR-3.6.3 | The admin panel shall support order management: payment, fulfilment, shipment, cancellation, return and refund status. | M |
| FR-3.6.4 | The admin panel shall support inventory management and stock-movement tracking. | M |
| FR-3.6.5 | The admin panel shall support customer management, and coupon/discount management. | M |
| FR-3.6.6 | The admin panel shall support moderation of reviews and testimonials. | M |
| FR-3.6.7 | The admin panel shall support FAQ, blog and general content management, including homepage/marketing content, so that content is not hardcoded into the frontend. | M |
| FR-3.6.8 | The admin panel shall support admin roles and role-based permissions (RBAC). | M |

### 3.7 Inventory & Batch Traceability

As Nutrexia is a packaged nutrition product, the system shall support batch-level traceability even for a small initial product range.

| Req ID | Description | Priority |
|---|---|:---:|
| FR-3.7.1 | The system shall record, per batch: batch number, manufacturing date, expiry date, quantity produced/available, and a lab report/COA reference. | M |
| FR-3.7.2 | The system shall track production status and link batches to inventory records. | M |
| FR-3.7.3 | The system shall support an optional QR code reference on packaging for batch verification. | C |

---

## 4. External Interface Requirements

### 4.1 User Interfaces

- A mobile-first, responsive interface across common phone, tablet and desktop breakpoints, consistent with the approved Nutrexia baseline design.
- A reusable Nutrexia design system / component library for consistent UI across the storefront and admin panel.
- App-style navigation and a mobile-friendly checkout flow.

### 4.2 Hardware Interfaces

No dedicated hardware is required. The system shall run on standard client devices (desktop/laptop, tablet, smartphone) capable of running an evergreen web browser, and on standard cloud server infrastructure for the backend.

### 4.3 Software Interfaces

| Interface | Purpose |
|---|---|
| Razorpay API | UPI, card and net-banking payment processing; server-side payment verification and webhooks. |
| Shiprocket API (or equivalent) | Pincode serviceability checks, shipping label generation, shipment creation and tracking. |
| S3-compatible storage + CDN | Storage and delivery of product images, documents and lab reports. |
| GA4 | Web analytics and conversion tracking. |
| Meta (Facebook/Instagram) Pixel/Conversions API | Campaign measurement and marketing attribution. |
| Redis (recommended) | Caching, rate limiting and background job queues. |

### 4.4 Communication Interfaces

- All client-server communication shall occur over HTTPS.
- The backend shall expose a structured API (REST, via NestJS) consumed by the Next.js frontend and the admin panel.
- Payment and shipping providers shall communicate with the backend via authenticated API calls and signed webhooks.

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Req ID | Description | Priority |
|---|---|:---:|
| NFR-5.1.1 | Public pages shall use server-rendered or statically rendered Next.js output to optimise load time and SEO. | M |
| NFR-5.1.2 | Product images shall be optimised and lazy-loaded. | M |
| NFR-5.1.3 | The system shall be monitored against Core Web Vitals performance targets. | S |

### 5.2 SEO

| Req ID | Description | Priority |
|---|---|:---:|
| NFR-5.2.1 | Pages shall have unique metadata, canonical URLs and Open Graph data. | M |
| NFR-5.2.2 | The system shall provide structured data (Product, Organization, Breadcrumb, FAQ, review) where applicable. | M |
| NFR-5.2.3 | The system shall provide an XML sitemap and robots configuration, and keep product/content pages indexable. | M |

### 5.3 Security

| Req ID | Description | Priority |
|---|---|:---:|
| NFR-5.3.1 | HTTPS shall be enforced throughout the production environment. | M |
| NFR-5.3.2 | The system shall use a secure authentication/session or token strategy, with hashed passwords where passwords are used. | M |
| NFR-5.3.3 | The admin panel shall enforce role-based authorization on all sensitive actions. | M |
| NFR-5.3.4 | The API shall implement rate limiting and request validation. | M |
| NFR-5.3.5 | The system shall use secure cookies and appropriate HTTP security headers. | M |
| NFR-5.3.6 | Payment signatures and webhooks shall be verified server-side. | M |
| NFR-5.3.7 | Price, discount, stock and order data shall be validated server-side regardless of client input. | M |
| NFR-5.3.8 | Secrets and credentials shall be held in environment variables/secret storage, never in frontend code. | M |
| NFR-5.3.9 | The system shall maintain audit logs and a database backup and recovery procedure. | M |

### 5.4 PWA / Mobile Web Strategy

| Req ID | Description | Priority |
|---|---|:---:|
| NFR-5.4.1 | The system shall provide a Web App Manifest (name, icon, theme, standalone display) for installability. | M |
| NFR-5.4.2 | The system shall use a service worker with controlled caching of the app shell and suitable static assets. | M |
| NFR-5.4.3 | The application shall be installable where browser/OS support permits, without requiring a separate native app at launch. | M |
| NFR-5.4.4 | Push notifications may be added subject to browser/device support and explicit user permission. | C |

### 5.5 Reliability, Availability and Maintainability

- The single-backend, single-database architecture is intended to simplify operations, monitoring and maintenance for a 2–3 product launch.
- Configurable content (homepage messaging, founding-price rules, comparison content) shall be editable by administrators without requiring a code deployment.
- The codebase shall be organised as a monorepo (see Section 6) with shared types/validation to reduce duplication and drift between frontend, backend and admin.

### 5.6 Compatibility / Extensibility

- The architecture shall allow a native Android/iOS application to be introduced later without replacing the commerce backend.
- The system shall be designed so that Razorpay or the shipping provider could be replaced without rebuilding the storefront, since integrations sit behind the backend API.

---

## 6. System Architecture

The system follows a three-tier architecture: **PostgreSQL** (source of truth) → **Node.js/NestJS API** (commerce and business logic) → **Next.js/React PWA** (responsive storefront). Razorpay and the shipping provider connect to the backend only; the customer always interacts through the single frontend, regardless of device.

| Customer Device | Application Delivered |
|---|---|
| Desktop / Laptop | Next.js Web App |
| Tablet | Same responsive Web App |
| Android / iPhone browser | Same responsive Web App |
| Installed mobile experience | Same Web App installed as a PWA |

**Project structure (monorepo):**

```
nutrexia/
├── apps/web/             # Next.js storefront + PWA
├── apps/api/             # Node.js backend (NestJS)
├── apps/admin/           # Admin panel (may share Next.js infrastructure)
├── packages/ui/          # Shared UI components
├── packages/types/       # Shared TypeScript types
├── packages/validation/  # Shared validation schemas
├── packages/utils/       # Shared utilities
└── prisma/               # PostgreSQL schema + migrations
```

---

## 7. Data Model (Suggested)

The following logical entity groups define the minimum data model. Final field-level schema will be produced during the Foundation phase using Prisma.

| Area | Core Tables / Entities |
|---|---|
| Users | users, user_profiles, addresses |
| Catalogue | products, product_variants, product_images, categories |
| Inventory | inventory, inventory_movements, batches |
| Commerce | carts, cart_items, orders, order_items, order_addresses |
| Payments | payments, refunds |
| Subscriptions | subscriptions, subscription_items |
| Marketing | coupons, coupon_usage, newsletter_subscribers |
| Engagement | wishlists, wishlist_items, reviews, notifications |
| Content | blog_posts, faqs, lab_reports, certifications |
| Security | audit_logs |

---

## 8. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js + React + TypeScript | Responsive storefront, SEO, routing, SSR/SSG and PWA |
| Styling / UI | Modern component system | Reusable Nutrexia design system and mobile-first UI |
| Backend | Node.js + TypeScript | Commerce APIs, authentication, orders, payments, subscriptions |
| API Framework | NestJS (recommended) | Structured, scalable backend architecture |
| Database | PostgreSQL | Products, customers, carts, orders, payments, subscriptions, inventory |
| ORM | Prisma | Type-safe database access and migrations |
| Caching / Queues | Redis (recommended) | Caching, rate limits and background jobs where required |
| Payments | Razorpay | UPI / cards / net banking and payment processing |
| Shipping | Shiprocket or equivalent | Pincode serviceability, labels, shipment and tracking |
| Storage / CDN | S3-compatible + CDN | Product images, documents and lab reports |
| Analytics | GA4 + Meta tracking | Conversion and campaign measurement |

Initial catalogue at launch: Trial Pack (5 × 30g sachets), 1kg Pouch (approx. 33 servings), and a Monthly Subscription (1kg auto-delivered).

### 8.1 Analytics Event Requirements

The system shall emit the following customer events to support GA4, Meta campaign measurement and future automation (abandoned-cart, email, WhatsApp, push):

- `page_view`, `product_view`, `add_to_cart`, `remove_from_cart`
- `begin_checkout`, `payment_started`, `purchase`
- `subscription_started`, `subscription_cancelled`

---

## 9. Implementation Phases

| Phase | Description | Estimated Duration |
|:---:|---|---|
| 0 | Discovery & architecture | 1–2 days |
| 1 | Foundation & environments | 2–4 days |
| 2 | Design system | 3–5 days |
| 3 | Storefront build | 5–8 days |
| 4 | Auth & customer account | 2–3 days |
| 5 | Checkout, Razorpay, shipping | 4–6 days |
| 6 | Orders & tracking | 3–5 days |
| 7 | Admin panel & inventory | 5–8 days |
| 8 | Subscription engine | 3–5 days |
| 9 | Analytics, marketing, CMS | 3–5 days |
| 10 | PWA & mobile UX | 3–5 days |
| 11 | QA, security, UAT, launch | 4–7 days |

*Durations are planning estimates and depend on final requirements, content readiness, payment/shipping onboarding and client feedback cycles.*

---

## 10. MVP Launch Scope and Future Expansion

### 10.1 MVP Launch Scope

| Category | In MVP |
|---|---|
| Storefront | Responsive Nutrexia storefront/PWA; homepage on approved baseline; shop & product detail pages; SEO foundations & analytics. |
| Commerce | Cart & secure checkout; Razorpay integration; shipping integration; coupons/discounts; subscription purchase & management. |
| Accounts & Ops | Customer accounts & orders; admin product/order/inventory management; reviews. |

MVP also includes security hardening, QA and production deployment across the full scope above.

### 10.2 Future Expansion (Post-MVP)

- Loyalty / rewards programme
- Referral programme
- Abandoned-cart automation
- WhatsApp automation
- Advanced push notifications
- Gift cards
- Batch QR verification
- Personalised recommendations
- Advanced customer analytics
- Native Android/iOS application (if justified by business requirements)

### 10.3 Key Business Benefits of the Single-Web-App Approach

- One frontend to develop and maintain, with lower initial development and QA effort.
- Same customer experience across desktop and mobile, with an SEO-friendly public storefront.
- Installable, app-like mobile experience through the PWA.
- One backend, one commerce engine, one database — faster iteration for a 2–3 product launch.
- A native app can be added later without replacing the backend.

---

## 11. Client Inputs Required Before Development

The following inputs are dependencies from Nutrexia and must be provided ahead of the relevant implementation phase:

- Final logo, brand guidelines, colours and fonts.
- Final product names, variants/flavours, pack sizes and SKUs.
- Final pricing, MRP, discounts and subscription rules.
- Product photographs and lifestyle imagery.
- Final nutrition, ingredient, allergen and regulatory content.
- Lab reports, certificates and documentation approved for publication.
- Shipping/fulfilment details and serviceable regions.
- Return, refund, cancellation, privacy and terms policies.
- Razorpay merchant account and required business verification.
- Shipping-provider account and API access.
- Domain, hosting and production deployment preferences.
- Final approval of claims, testimonials and comparison content before publication.

---

## 12. Content & Compliance Note

> **⚠️ Client-Supplied Content — Pending Legal Review**
>
> The baseline contains health, nutrition, allergen, lab-testing, climate and product-performance statements. These are treated as client-supplied content pending final legal/regulatory review and supporting documentation. The development team will implement approved content and provide configurable content management, rather than independently validating or inventing claims.

---

## 13. Acceptance and Sign-off

This SRS is prepared as a technical planning document to support client discussion and shall be treated as a living document. Final requirements may be refined during discovery and UI/UX approval. Acceptance of each implementation phase (Section 9) will be against the requirements traceability defined in Sections 3–5 of this document, validated during QA/UAT (Phase 11).

**Prepared by:** CM-eServices (a digital studio of IDEALERS B2B PVT LTD)
**Website:** cm-eservices.com
