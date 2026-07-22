// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

afterEach(() => {
  cleanup();
});

describe("homepage", () => {
  it("shows the approved hero copy without extra above-the-fold drift", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Are Massachusetts aesthetic professionals being paid fairly?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The first independent compensation benchmark for injectors, aesthetic nurses, NPs, PAs, aestheticians and other medical-aesthetic professionals across Massachusetts.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Share your compensation anonymously. See how your pay compares. Help make the industry more transparent.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Compare My Compensation")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Anonymous • Approximately 4 minutes • Individual responses are never published",
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText("Independent Massachusetts benchmark")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Built for a mobile-first launch and designed to respect anonymity/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("A clearer market picture starts with better source data."),
    ).not.toBeInTheDocument();
  });

  it("includes the required homepage sections and footer links", () => {
    render(
      <>
        <Header />
        <HomePage />
        <Footer />
      </>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Massachusetts aesthetics still runs on private numbers and public guesswork.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "What participants get from contributing",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Who should participate" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Compensation opacity makes it harder to build durable careers in aesthetics.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Privacy, anonymity, and discretion are part of the product.",
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Privacy" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Terms" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "mailto:hello@aestheticcareerclub.com",
    );
    expect(screen.getByText(/Copyright © 2026 Aesthetic Career Club/i)).toBeInTheDocument();
  });
});
