# Hungry Hippo

A example application built with SvelteKit, Prisma, and Temporal.

## Getting Started

As usual, install all of the dependencies.

```
pnpm install
```

### Create the Database

The SQLite database is not checked into version control, but you can create it quickly.

```
npx run database
```

## Running the Payments Server

There is a simple little server that we can spin up or take down. When we're using Temporal, the workflow will retry to process the payment until the server come back up.

You can start the server using the following script:

```
npm run payments
```

## Two Implementations

1. `src/lib/_with-database.ts` is a naïve implementation. It's what we have in `src/lib/index.ts` by default. This exists in order to demonstrate how the application works without Temporal.
2. `src/lib/_with-temporal.ts` supports a _really_ simple workflow. There is definitely a lot more we could do to improve the workflow, but this is enough to give us a sense of what it's like to work with Temporal.

## Completed Example

The completed example can be found in `src/lib/temporal/_complete-workflow.ts`.

## The Game Plan

- We're going to create a workflow that creates an order.
- We'll wait until we hear back from the payment processing server.
- Then we'll wait on a signal from the restaurant that they've good to make the order.
- Then we'll rush through the remaining steps.
- Finally, we'll wait a day and then we'll send them a follow-up email.
