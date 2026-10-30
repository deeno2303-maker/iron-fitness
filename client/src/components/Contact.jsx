import { useState } from "react";
import { submitTrialRequest } from "../api";
import { useAuth } from "../context/AuthContext";

const trainingOptions = ["Strength", "Conditioning", "Mobility", "Not sure yet"];
const experienceOptions = [
  ["new", "New to training"],
  ["beginner", "Beginner"],
  ["intermediate", "Intermediate"],
  ["experienced", "Experienced"],
  ["returning", "Returning after a break"],
];

const trialRequestEmail = "slowmoe.7860@gmail.com";

export default function Contact() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const request = Object.fromEntries(formData.entries());
    request.consent = formData.get("consent") === "on";

    try {
      const result = await submitTrialRequest(request);
      setStatus({
        kind: result.emailSent ? "success" : "warning",
        message: result.emailSent
          ? "Your request was saved, and we have sent the email. Please contact slowmoe.7860@gmail.com to follow up."
          : "Your request was saved, but the email notification could not be sent. Please contact slowmoe.7860@gmail.com to follow up.",
      });
      form.reset();
    } catch (error) {
      setStatus({ kind: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  function handleSendByEmail(e) {
    const form = e.currentTarget.form;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const experienceValue = formData.get("experienceLevel");
    const experienceLabel = experienceOptions.find(([value]) => value === experienceValue)?.[1] || experienceValue;
    const name = formData.get("name").trim();
    const subject = `Free trial request from ${name}`;
    const body = [
      "Hello Ironhouse,",
      "",
      "I would like to request a free trial class. Here are my details:",
      "",
      `Name: ${name}`,
      `Email: ${formData.get("email").trim()}`,
      `Phone: ${formData.get("phone").trim() || "Not provided"}`,
      `Training interest: ${formData.get("preferredSession")}`,
      `Training experience: ${experienceLabel}`,
      `Goals: ${formData.get("goals").trim()}`,
      "Consent to be contacted: Yes",
      "",
      "Thank you.",
    ].join("\n");

    window.location.href = `mailto:${trialRequestEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-iron bg-steel py-14 md:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-8">
        <p className="section-kicker justify-center"><span className="h-px w-8 bg-blaze" />Start where you are</p>
        <h2 id="contact-heading" className="section-title mb-2">Come try a class</h2>
        <p className="text-lg text-muted">Tell us a little about what you’re looking for.</p>
        <p className="mb-8 text-muted">
          We’ll use these details to help find a good first session for you.
        </p>
        <form
          onSubmit={handleSubmit}
          aria-describedby="trial-form-help"
          className="mx-auto max-w-2xl space-y-6 rounded-card border border-iron bg-ink p-5 text-left shadow-xl shadow-black/20 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-chalk" htmlFor="trial-name">
                Full name <span className="text-blaze" aria-hidden="true">*</span>
              </label>
              <input
                id="trial-name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                defaultValue={user?.name || ""}
                aria-describedby="trial-name-help"
                className="w-full rounded-lg border border-iron bg-steel px-4 py-3 text-chalk placeholder:text-muted focus:border-blaze focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2"
              />
              <p id="trial-name-help" className="mt-1 text-xs text-muted">What should we call you?</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-chalk" htmlFor="trial-email">
                Email address <span className="text-blaze" aria-hidden="true">*</span>
              </label>
              <input
                id="trial-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                defaultValue={user?.email || ""}
                className="w-full rounded-lg border border-iron bg-steel px-4 py-3 text-chalk placeholder:text-muted focus:border-blaze focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2"
              />
              <p className="mt-1 text-xs text-muted">We’ll reply to this address.</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-chalk" htmlFor="trial-phone">
                Phone number <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="trial-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                className="w-full rounded-lg border border-iron bg-steel px-4 py-3 text-chalk placeholder:text-muted focus:border-blaze focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2"
              />
              <p className="mt-1 text-xs text-muted">Add a number if you prefer a call or text.</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-chalk" htmlFor="trial-focus">
                Training interest <span className="text-blaze" aria-hidden="true">*</span>
              </label>
              <select
                id="trial-focus"
                name="preferredSession"
                required
                defaultValue=""
                className="w-full rounded-lg border border-iron bg-steel px-4 py-3 text-chalk focus:border-blaze focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2"
              >
                <option value="" disabled>Choose an area</option>
                {trainingOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-chalk" htmlFor="trial-experience">
                Training experience <span className="text-blaze" aria-hidden="true">*</span>
              </label>
              <select
                id="trial-experience"
                name="experienceLevel"
                required
                defaultValue=""
                className="w-full rounded-lg border border-iron bg-steel px-4 py-3 text-chalk focus:border-blaze focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2"
              >
                <option value="" disabled>Choose the best fit</option>
                {experienceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-chalk" htmlFor="trial-goals">
                What would you like to work towards? <span className="text-blaze" aria-hidden="true">*</span>
              </label>
              <textarea
                id="trial-goals"
                name="goals"
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                placeholder="For example: build strength, improve fitness, or return to training."
                aria-describedby="trial-goals-help"
                className="w-full resize-y rounded-lg border border-iron bg-steel px-4 py-3 text-chalk placeholder:text-muted focus:border-blaze focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2"
              />
              <p id="trial-goals-help" className="mt-1 text-xs text-muted">Share as much or as little as you’re comfortable with.</p>
            </div>
          </div>

          <p id="trial-form-help" className="text-sm text-muted">
            Required fields are marked with <span className="font-bold text-blaze">*</span>. Submit the form to send your request, or open a pre-filled email draft to send it yourself.
          </p>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-blaze)] focus-visible:outline"
            />
            <span>I agree that Ironhouse may use these details to contact me about this trial request.</span>
          </label>

          {status && (
            <p
              role={status.kind === "error" ? "alert" : "status"}
              aria-live={status.kind === "error" ? "assertive" : "polite"}
              className={`rounded-lg border p-4 text-sm ${
                status.kind === "success"
                  ? "border-ok/40 bg-ok/10 text-chalk"
                  : status.kind === "warning"
                    ? "border-accent/50 bg-accent/10 text-chalk"
                    : "border-red-400/50 bg-red-400/10 text-chalk"
              }`}
            >
              {status.message}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn w-full bg-blaze text-ink hover:bg-blaze-dark disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Sending request…" : "Request a free trial"}
          </button>
          <button
            type="button"
            onClick={handleSendByEmail}
            className="btn w-full border border-iron text-chalk hover:border-accent hover:bg-accent hover:text-ink"
          >
            Send request by email
          </button>
          <p className="m-0 text-center text-xs text-muted">
            Opens your email app with the form details filled in. Review and send the email to complete your request.
          </p>
        </form>
      </div>
    </section>
  );
}
