import { createContext, useCallback, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { addEnquiry, publicActivities, publicProducts, useAppData } from "@/lib/store";
import { cn } from "@/lib/utils";

export type EnquiryPrefill = { interest?: string; subject?: string };

const EnquiryContext = createContext<{ openEnquiry: (p?: EnquiryPrefill) => void }>({
  openEnquiry: () => {},
});

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<EnquiryPrefill>({});
  const [formKey, setFormKey] = useState(0);
  const openEnquiry = useCallback((p?: EnquiryPrefill) => {
    setPrefill(p ?? {});
    setFormKey((k) => k + 1);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);
  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <Modal open={open} onClose={close} title="Send an Enquiry" size="md">
        <div className="px-6 py-6">
          <EnquiryForm key={formKey} prefill={prefill} compact />
        </div>
      </Modal>
    </EnquiryContext.Provider>
  );
}

type Errors = Partial<Record<"name" | "phone" | "email" | "subject" | "message", string>>;

export function validateEnquiry(v: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  const digits = v.phone.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (local.length !== 10) e.phone = "Please enter a valid 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

export function EnquiryForm({ prefill, compact = false }: { prefill?: EnquiryPrefill; compact?: boolean }) {
  const data = useAppData();
  const options = useMemo(() => {
    const products = publicProducts(data).map((p) => p.name);
    const activities = publicActivities(data).map((a) => a.title);
    return { products, activities };
  }, [data]);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    subject: prefill?.subject ?? "",
    interest: prefill?.interest ?? "General Enquiry",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ name: string; ref: string } | null>(null);

  const extraOption =
    values.interest !== "General Enquiry" &&
    !options.products.includes(values.interest) &&
    !options.activities.includes(values.interest)
      ? values.interest
      : null;

  const set = (k: keyof typeof values) => (ev: { target: { value: string } }) =>
    setValues((s) => ({ ...s, [k]: ev.target.value }));

  function submit(ev: FormEvent) {
    ev.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const saved = addEnquiry({
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      interest: values.interest,
      message: values.message.trim(),
    });
    setDone({ name: saved.name, ref: saved.id.slice(-6).toUpperCase() });
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-sage px-6 py-10 text-center animate-in fade-in zoom-in-95">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-on-dark shadow-glow">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-deep">Thank you, {done.name}!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Your enquiry has been received. Our team will get in touch with you soon.
        </p>
        <p className="mt-3 rounded-full bg-card px-4 py-1.5 text-xs font-bold tracking-wider text-forest">
          Reference: ENQ-{done.ref}
        </p>
        <button
          className="btn btn-sm btn-outline mt-6"
          onClick={() => {
            setDone(null);
            setValues((s) => ({ ...s, subject: "", message: "" }));
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field label="Full Name" error={errors.name}>
        <input className="field" value={values.name} onChange={set("name")} placeholder="Your name" autoComplete="name" />
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <input className="field" value={values.phone} onChange={set("phone")} placeholder="10-digit mobile number" inputMode="tel" autoComplete="tel" />
      </Field>
      <Field label="Email" error={errors.email}>
        <input className="field" type="email" value={values.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
      </Field>
      <Field label="Subject" error={errors.subject}>
        <input className="field" value={values.subject} onChange={set("subject")} placeholder="What is this about?" />
      </Field>
      <Field label="Product / Activity" className="sm:col-span-2">
        <select className="field" value={values.interest} onChange={set("interest")}>
          <option>General Enquiry</option>
          {extraOption ? <option>{extraOption}</option> : null}
          <optgroup label="Agro Products">
            {options.products.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </optgroup>
          <optgroup label="Agricultural Activities">
            {options.activities.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </optgroup>
        </select>
      </Field>
      <Field label="Message" error={errors.message} className="sm:col-span-2">
        <textarea
          className="field min-h-[7.5rem] resize-y"
          rows={compact ? 4 : 5}
          value={values.message}
          onChange={set("message")}
          placeholder="Tell us how we can help you"
        />
      </Field>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          <Send className="h-4 w-4" /> Submit Enquiry
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-bold uppercase tracking-wider text-deep/80">{label}</span>
      {children}
      {error ? <span className="text-xs font-medium text-destructive">{error}</span> : null}
    </label>
  );
}
