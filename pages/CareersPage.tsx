import React, { useState } from "react";
import { CAREERS_FORM_ACCESS_KEY, FOOTER_CONTACT_INFO } from "../constants";
import AnimatedCheckmark from "../components/icons/AnimatedCheckmark";

// Web3Forms turns this POST into an email to the inbox behind CAREERS_FORM_ACCESS_KEY.
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
  // Union territories
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const AGENCY = "Agency with a team";
const JOINING_OPTIONS = ["Field engineer", AGENCY];
const WORK_TYPES = ["Full-time", "Freelance"];
const EXPERIENCE_OPTIONS = ["No experience yet", "Less than 1 year", "1 to 3 years", "More than 3 years"];
const VEHICLE_TYPES = [
  "Two-wheeler", "Three-wheeler", "Car", "Truck / commercial vehicle", "Bus", "Tractor",
  "Construction equipment",
];
const SMARTPHONE_OPTIONS = ["Android", "iPhone", "No smartphone"];
const YES_NO = ["Yes", "No"];

type FormState = {
  name: string;
  phone: string;
  email: string;
  joiningAs: string;
  agencyName: string;
  teamSize: string;
  workType: string;
  state: string;
  city: string;
  pincode: string;
  areas: string;
  experience: string;
  vehicleTypes: string[];
  smartphone: string;
  twoWheeler: string;
  drivingLicence: string;
  message: string;
  consent: boolean;
  // Honeypot: hidden from people, so only bots fill it in.
  website: string;
};

type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;

const EMPTY_FORM: FormState = {
  name: "", phone: "", email: "", joiningAs: "", agencyName: "", teamSize: "", workType: "",
  state: "", city: "", pincode: "", areas: "", experience: "", vehicleTypes: [],
  smartphone: "", twoWheeler: "", drivingLicence: "", message: "", consent: false, website: "",
};

// Order the fields appear on the page, so a failed submit focuses the first problem.
const FIELD_ORDER: Field[] = [
  "name", "phone", "email", "joiningAs", "teamSize", "workType", "state", "city", "pincode",
  "experience", "smartphone", "twoWheeler", "drivingLicence", "consent",
];

// Keeps the 10 digits of an Indian mobile number typed with +91, a leading 0 or spaces.
const normalisePhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const validate = (f: FormState): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(normalisePhone(f.phone))) e.phone = "Please enter a 10-digit mobile number.";
  if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "This email address doesn't look right.";
  if (!f.joiningAs) e.joiningAs = "Please choose how you want to join.";
  if (f.joiningAs === AGENCY) {
    const size = Number(f.teamSize);
    if (!Number.isInteger(size) || size < 2) e.teamSize = "Please enter how many people are in your team (2 or more).";
  }
  if (!f.workType) e.workType = "Please choose full-time or freelance.";
  if (!f.state) e.state = "Please choose your state.";
  if (!f.city.trim()) e.city = "Please enter your district or city.";
  if (!/^[1-9]\d{5}$/.test(f.pincode.trim())) e.pincode = "Please enter a 6-digit pincode.";
  if (!f.experience) e.experience = "Please choose your experience.";
  if (!f.smartphone) e.smartphone = "Please choose an option.";
  if (!f.twoWheeler) e.twoWheeler = "Please choose an option.";
  if (!f.drivingLicence) e.drivingLicence = "Please choose an option.";
  if (!f.consent) e.consent = "Please agree so our team can contact you.";
  return e;
};

const inputBase =
  "mt-1 block w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2";
const inputClass = (error?: string) =>
  `${inputBase} ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`;

const Required = () => <span className="text-accent-red">*</span>;

const ErrorText: React.FC<{ error?: string }> = ({ error }) =>
  error ? <p className="mt-1.5 text-sm font-semibold text-red-600">{error}</p> : null;

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-bold uppercase tracking-wider text-teal-700 border-b border-gray-200 pb-2">
    {children}
  </h3>
);

const ChoiceGroup: React.FC<{
  name: Field;
  label: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}> = ({ name, label, options, value, error, onChange }) => (
  <fieldset>
    <legend className="block text-sm font-medium text-gray-700">
      {label} <Required />
    </legend>
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((option, index) => {
        const selected = value === option;
        return (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
              selected
                ? "border-teal-600 bg-teal-50 font-semibold text-teal-800"
                : error
                  ? "border-red-400 text-gray-700 hover:border-teal-400"
                  : "border-gray-300 text-gray-700 hover:border-teal-400"
            }`}
          >
            <input
              id={index === 0 ? `career-${name}` : undefined}
              type="radio"
              name={name}
              value={option}
              checked={selected}
              onChange={() => onChange(option)}
              className="accent-teal-600"
            />
            {option}
          </label>
        );
      })}
    </div>
    <ErrorText error={error} />
  </fieldset>
);

const CareersPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const errors = showErrors ? validate(form) : {};
  const isAgency = form.joiningAs === AGENCY;
  const whatsappDigits = FOOTER_CONTACT_INFO.whatsapp.replace(/\D/g, "");

  const set = <K extends Field>(field: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleText = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    set(e.target.name as Field, e.target.value);

  const toggleVehicleType = (type: string) =>
    set(
      "vehicleTypes",
      form.vehicleTypes.includes(type)
        ? form.vehicleTypes.filter((t) => t !== type)
        : [...form.vehicleTypes, type],
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setShowErrors(true);
      const first = FIELD_ORDER.find((field) => found[field]);
      document.getElementById(`career-${first}`)?.focus();
      return;
    }

    // A filled honeypot means a bot: show the thank-you screen but send nothing.
    if (form.website) {
      setStatus("sent");
      return;
    }

    if (!CAREERS_FORM_ACCESS_KEY) {
      console.error("CAREERS_FORM_ACCESS_KEY is empty, so the application was not sent.");
      setStatus("failed");
      return;
    }

    setStatus("sending");
    const phone = normalisePhone(form.phone);
    const notGiven = (value: string) => value.trim() || "Not given";

    // Keys become the labels in the email the team receives, in this order.
    const payload: Record<string, string> = {
      access_key: CAREERS_FORM_ACCESS_KEY,
      subject: `Careers application: ${form.name.trim()} - ${form.joiningAs}, ${form.city.trim()}, ${form.state}`,
      from_name: "Vehga website - Careers",
      "Full name": form.name.trim(),
      Mobile: `+91 ${phone}`,
      "WhatsApp link": `https://wa.me/91${phone}`,
      Email: notGiven(form.email),
      "Joining as": form.joiningAs,
      ...(isAgency ? { "Agency name": notGiven(form.agencyName), "Team size": form.teamSize.trim() } : {}),
      "Work type": form.workType,
      State: form.state,
      "District / City": form.city.trim(),
      Pincode: form.pincode.trim(),
      "Other areas they can cover": notGiven(form.areas),
      Experience: form.experience,
      "Vehicles inspected before": form.vehicleTypes.join(", ") || "None selected",
      Smartphone: form.smartphone,
      "Has a two-wheeler": form.twoWheeler,
      "Has a driving licence": form.drivingLicence,
      Message: notGiven(form.message),
      "Agreed to be contacted": "Yes",
      "Submitted at": `${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    };

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.message || `HTTP ${res.status}`);
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Careers application could not be sent:", err);
      setStatus("failed");
    } finally {
      window.clearTimeout(timer);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 items-start">

        {/* LEFT SIDE CONTENT */}
        <div className="md:col-span-2 md:sticky md:top-28">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-600">Careers</p>
          <h1 className="mt-2 text-4xl font-bold text-gray-800">Join Vehga as a Field Engineer</h1>
          <p className="text-gray-600 mt-4">
            Join our network of field partners for vehicle inspections and valuations.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Pan India · all locations", "Full-time or freelance"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="mt-8 text-lg font-bold text-gray-800">Two ways to join</h2>
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="font-semibold text-gray-800">Field engineer</p>
              <p className="mt-1 text-sm text-gray-600">
                Visit vehicles in your area and capture inspection photos on the Vehga app.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="font-semibold text-gray-800">Agency with a team</p>
              <p className="mt-1 text-sm text-gray-600">
                Have a team? Partner with us as an agency. We assign the inspections, your team
                captures the photos.
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-bold text-gray-800">Each person needs</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li>✔ A smartphone</li>
            <li>✔ A two-wheeler</li>
          </ul>

          <div className="mt-6 rounded-xl bg-teal-700 p-4 text-white shadow-md">
            <p className="font-semibold">Training provided</p>
            <p className="mt-1 text-sm text-teal-50">
              Comprehensive technical assistance and hands-on training are fully provided by the
              company.
            </p>
          </div>
          <p className="mt-3 font-semibold text-gray-700">✔ Quick, hassle-free payments</p>

          <p className="mt-6 text-sm text-gray-600">
            Questions? Call or WhatsApp{" "}
            <a
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-700 underline underline-offset-2"
            >
              {FOOTER_CONTACT_INFO.whatsapp}
            </a>
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:col-span-3 bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full">
          {status === "sent" ? (
            <div className="py-10 text-center" role="status">
              <AnimatedCheckmark />
              <h2 className="text-2xl font-bold text-gray-800">Thank you, {form.name.trim()}!</h2>
              <p className="mt-3 text-gray-600">
                We have received your application. Our team will call or WhatsApp you on{" "}
                <span className="font-semibold">+91 {normalisePhone(form.phone)}</span>.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-800">Register now</h2>
              <p className="mt-1 text-center text-sm text-gray-500">
                Fields marked <Required /> are required.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-8">

                <div className="space-y-4">
                  <SectionTitle>Your details</SectionTitle>
                  <div>
                    <label htmlFor="career-name" className="block text-sm font-medium text-gray-700">
                      Full name <Required />
                    </label>
                    <input
                      id="career-name" name="name" type="text" autoComplete="name"
                      value={form.name} onChange={handleText} className={inputClass(errors.name)}
                      aria-invalid={!!errors.name}
                    />
                    <ErrorText error={errors.name} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="career-phone" className="block text-sm font-medium text-gray-700">
                        Mobile number (WhatsApp) <Required />
                      </label>
                      <input
                        id="career-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
                        placeholder="10-digit number" value={form.phone} onChange={handleText}
                        className={inputClass(errors.phone)} aria-invalid={!!errors.phone}
                      />
                      <ErrorText error={errors.phone} />
                    </div>
                    <div>
                      <label htmlFor="career-email" className="block text-sm font-medium text-gray-700">
                        Email <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <input
                        id="career-email" name="email" type="email" autoComplete="email"
                        value={form.email} onChange={handleText} className={inputClass(errors.email)}
                        aria-invalid={!!errors.email}
                      />
                      <ErrorText error={errors.email} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <SectionTitle>How you want to work</SectionTitle>
                  <ChoiceGroup
                    name="joiningAs" label="I want to join as" options={JOINING_OPTIONS}
                    value={form.joiningAs} error={errors.joiningAs} onChange={(v) => set("joiningAs", v)}
                  />
                  {isAgency && (
                    <div className="grid gap-4 sm:grid-cols-2 rounded-lg bg-gray-50 p-4">
                      <div>
                        <label htmlFor="career-agencyName" className="block text-sm font-medium text-gray-700">
                          Agency name <span className="font-normal text-gray-400">(optional)</span>
                        </label>
                        <input
                          id="career-agencyName" name="agencyName" type="text" autoComplete="organization"
                          value={form.agencyName} onChange={handleText} className={inputClass()}
                        />
                      </div>
                      <div>
                        <label htmlFor="career-teamSize" className="block text-sm font-medium text-gray-700">
                          People in your team <Required />
                        </label>
                        <input
                          id="career-teamSize" name="teamSize" type="number" min={2} inputMode="numeric"
                          value={form.teamSize} onChange={handleText} className={inputClass(errors.teamSize)}
                          aria-invalid={!!errors.teamSize}
                        />
                        <ErrorText error={errors.teamSize} />
                      </div>
                      <p className="sm:col-span-2 text-xs text-gray-500">
                        Each team member needs a smartphone and a two-wheeler.
                      </p>
                    </div>
                  )}
                  <ChoiceGroup
                    name="workType" label="Work type" options={WORK_TYPES}
                    value={form.workType} error={errors.workType} onChange={(v) => set("workType", v)}
                  />
                </div>

                <div className="space-y-4">
                  <SectionTitle>Where you are</SectionTitle>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="career-state" className="block text-sm font-medium text-gray-700">
                        State <Required />
                      </label>
                      <select
                        id="career-state" name="state" value={form.state} onChange={handleText}
                        className={inputClass(errors.state)} aria-invalid={!!errors.state}
                      >
                        <option value="">Choose your state</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ErrorText error={errors.state} />
                    </div>
                    <div>
                      <label htmlFor="career-city" className="block text-sm font-medium text-gray-700">
                        District / City <Required />
                      </label>
                      <input
                        id="career-city" name="city" type="text" autoComplete="address-level2"
                        value={form.city} onChange={handleText} className={inputClass(errors.city)}
                        aria-invalid={!!errors.city}
                      />
                      <ErrorText error={errors.city} />
                    </div>
                    <div>
                      <label htmlFor="career-pincode" className="block text-sm font-medium text-gray-700">
                        Pincode <Required />
                      </label>
                      <input
                        id="career-pincode" name="pincode" type="text" inputMode="numeric" maxLength={6}
                        autoComplete="postal-code" value={form.pincode} onChange={handleText}
                        className={inputClass(errors.pincode)} aria-invalid={!!errors.pincode}
                      />
                      <ErrorText error={errors.pincode} />
                    </div>
                    <div>
                      <label htmlFor="career-areas" className="block text-sm font-medium text-gray-700">
                        Other areas you can cover <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <input
                        id="career-areas" name="areas" type="text" placeholder="Nearby towns or districts"
                        value={form.areas} onChange={handleText} className={inputClass()}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <SectionTitle>Experience and equipment</SectionTitle>
                  <div>
                    <label htmlFor="career-experience" className="block text-sm font-medium text-gray-700">
                      Experience in vehicle inspection <Required />
                    </label>
                    <select
                      id="career-experience" name="experience" value={form.experience} onChange={handleText}
                      className={inputClass(errors.experience)} aria-invalid={!!errors.experience}
                    >
                      <option value="">Choose one</option>
                      {EXPERIENCE_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <ErrorText error={errors.experience} />
                  </div>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">
                      Vehicles you have inspected before{" "}
                      <span className="font-normal text-gray-400">(optional, choose all that apply)</span>
                    </legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {VEHICLE_TYPES.map((type) => {
                        const checked = form.vehicleTypes.includes(type);
                        return (
                          <label
                            key={type}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                              checked
                                ? "border-teal-600 bg-teal-50 font-semibold text-teal-800"
                                : "border-gray-300 text-gray-700 hover:border-teal-400"
                            }`}
                          >
                            <input
                              type="checkbox" checked={checked} onChange={() => toggleVehicleType(type)}
                              className="accent-teal-600"
                            />
                            {type}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <ChoiceGroup
                    name="smartphone" label="Smartphone" options={SMARTPHONE_OPTIONS}
                    value={form.smartphone} error={errors.smartphone} onChange={(v) => set("smartphone", v)}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ChoiceGroup
                      name="twoWheeler" label="Do you have a two-wheeler?" options={YES_NO}
                      value={form.twoWheeler} error={errors.twoWheeler} onChange={(v) => set("twoWheeler", v)}
                    />
                    <ChoiceGroup
                      name="drivingLicence" label="Do you have a driving licence?" options={YES_NO}
                      value={form.drivingLicence} error={errors.drivingLicence}
                      onChange={(v) => set("drivingLicence", v)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <SectionTitle>Anything else</SectionTitle>
                  <div>
                    <label htmlFor="career-message" className="block text-sm font-medium text-gray-700">
                      Message <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="career-message" name="message" rows={3}
                      placeholder="Languages you speak, when you can start, or anything else"
                      value={form.message} onChange={handleText} className={inputClass()}
                    />
                  </div>

                  {/* Honeypot: off-screen and skipped by keyboard, so only bots fill it. */}
                  <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="career-website">Website</label>
                    <input
                      id="career-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                      value={form.website} onChange={handleText}
                    />
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
                      <input
                        id="career-consent" type="checkbox" checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-teal-600" aria-invalid={!!errors.consent}
                      />
                      <span>
                        I agree that Vehga Inspections can contact me by phone, WhatsApp or email
                        about this application. <Required />
                      </span>
                    </label>
                    <ErrorText error={errors.consent} />
                  </div>
                </div>

                {status === "failed" && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
                    Sorry, we couldn't send your application just now. Please try again, or call or
                    WhatsApp us on{" "}
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      {FOOTER_CONTACT_INFO.whatsapp}
                    </a>
                    .
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Submit application"}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default CareersPage;