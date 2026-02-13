import React, { useRef, useState, useTransition } from "react";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

const contactConfig = {
  title: "Let's build something",
  subtitle:
    "Share a project idea, collaboration, or opportunity. I usually respond within 24 hours.",
  buttonLabel: "Send message",
  fields: [
    {
      id: "contact-name",
      name: "entry.2005620554",
      label: "Name",
      type: "text",
      placeholder: "Your name",
      component: "input",
    },
    {
      id: "contact-email",
      name: "entry.1045781291",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      component: "input",
    },
    {
      id: "contact-subject",
      name: "entry.1166974658",
      label: "Subject",
      type: "text",
      placeholder: "What is this about?",
      component: "input",
    },
    {
      id: "contact-message",
      name: "entry.839337160",
      label: "Message",
      type: "text",
      placeholder: "Type your message...",
      component: "textarea",
      rows: 5,
    },
  ],
};

export default function Contact() {
  const formRef = useRef();
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const validateForm = () => {
    const form = formRef.current;
    if (!form) return false;

    const name = form["entry.2005620554"]?.value?.trim();
    const email = form["entry.1045781291"]?.value?.trim();
    const subject = form["entry.1166974658"]?.value?.trim();
    const message = form["entry.839337160"]?.value?.trim();

    if (!name || name.length < 2) {
      setError("Please enter your full name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!subject || subject.length < 3) {
      setError("Please add a short subject for your message.");
      return false;
    }

    if (!message || message.length < 10) {
      setError("Please write at least 10 characters in your message.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setError(null);
    setDone(false);
    setIsSubmitting(true);

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScNyBfJQ4tDxkuaTZEAzG0VF7aTIIoMRadWrFh5-o5NT9rvQw/formResponse";
    const formData = new FormData(formRef.current);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      formRef.current.reset();

      startTransition(() => {
        setDone(true);
      });
    } catch (err) {
      console.log("error on form submission", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = () => {
    if (done) setDone(false);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="flex flex-col items-center justify-center text-white relative z-10 px-4 py-16"
    >
      <div className="w-full max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 px-2 md:px-0 flex flex-col items-center"
        >
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-cyan-300 mb-2">
            Contact
          </p>
          <h3
            id="contact-heading"
            className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight"
          >
            {contactConfig.title}
          </h3>
          <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
            {contactConfig.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="glass-effect rounded-2xl p-5 sm:p-6 md:p-7 w-full max-w-xl mx-auto">
            <h4 className="text-xl font-semibold text-white mb-4 text-left">
              Send a message
            </h4>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full"
            >
              {contactConfig.fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium text-slate-200"
                  >
                    {field.label}
                  </label>
                  {field.component === "textarea" ? (
                    <textarea
                      id={field.id}
                      name={field.name}
                      rows={field.rows || 4}
                      placeholder={field.placeholder}
                      required
                      onChange={handleInputChange}
                      className="bg-transparent border border-white/15 text-white px-3 py-3 rounded-lg placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none transition-colors resize-none"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      onChange={handleInputChange}
                      className="bg-transparent border border-white/15 text-white px-3 py-3 rounded-lg placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none transition-colors"
                    />
                  )}
                </div>
              ))}

              <div className="mt-2 min-h-[1.5rem]" aria-live="polite">
                {error && <p className="text-sm text-red-400">{error}</p>}
                {!error && done && (
                  <p className="text-sm text-emerald-300">
                    Message sent successfully. Thank you for reaching out!
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="mt-1 inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 px-7 py-3 cursor-pointer rounded-full text-sm font-semibold shadow-[0_8px_30px_rgba(34,211,238,0.35)] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:from-cyan-300 hover:to-emerald-300 w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : contactConfig.buttonLabel}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
