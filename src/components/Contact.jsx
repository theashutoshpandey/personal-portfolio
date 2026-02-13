import React, { useEffect, useMemo, useRef, useState } from "react";
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

const SUBMISSION_LIMIT = 3;
const SUBMISSION_STORAGE_KEY = "portfolio_contact_submission_count_v1";
const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const getTodayStamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Contact() {
  const formRef = useRef();
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  const remainingSubmissions = useMemo(
    () => Math.max(SUBMISSION_LIMIT - submissionCount, 0),
    [submissionCount]
  );
  const hasReachedLimit = remainingSubmissions === 0;

  useEffect(() => {
    try {
      const rawValue = localStorage.getItem(SUBMISSION_STORAGE_KEY);
      const today = getTodayStamp();

      if (!rawValue) {
        setSubmissionCount(0);
        return;
      }

      const parsedValue = JSON.parse(rawValue);
      if (parsedValue?.date === today && Number.isInteger(parsedValue?.count)) {
        setSubmissionCount(parsedValue.count);
      } else {
        setSubmissionCount(0);
        localStorage.setItem(
          SUBMISSION_STORAGE_KEY,
          JSON.stringify({ date: today, count: 0 })
        );
      }
    } catch (storageError) {
      console.warn("Unable to read local submission count", storageError);
    }
  }, []);

  const persistSubmissionCount = (nextCount) => {
    setSubmissionCount(nextCount);
    try {
      localStorage.setItem(
        SUBMISSION_STORAGE_KEY,
        JSON.stringify({ date: getTodayStamp(), count: nextCount })
      );
    } catch (storageError) {
      console.warn("Unable to save local submission count", storageError);
    }
  };

  const validateField = (name, rawValue) => {
    const value = (rawValue || "").trim();

    if (name === "entry.2005620554") {
      return !value || value.length < 2 ? "Please enter your full name." : null;
    }

    if (name === "entry.1045781291") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || !emailRegex.test(value)
        ? "Please enter a valid email address."
        : null;
    }

    if (name === "entry.1166974658") {
      return !value || value.length < 3
        ? "Please add a short subject for your message."
        : null;
    }

    if (name === "entry.839337160") {
      return !value || value.length < 10
        ? "Please write at least 10 characters in your message."
        : null;
    }

    return null;
  };

  const validateAllFields = () => {
    const form = formRef.current;
    if (!form) return false;

    const nextFieldErrors = {};
    for (const field of contactConfig.fields) {
      const message = validateField(field.name, form[field.name]?.value);
      if (message) {
        nextFieldErrors[field.name] = message;
      }
    }

    setFieldErrors(nextFieldErrors);
    return Object.keys(nextFieldErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasReachedLimit) {
      setError("Daily submission limit reached. Please try again tomorrow.");
      return;
    }

    if (!validateAllFields()) {
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
      const nextCount = submissionCount + 1;
      persistSubmissionCount(nextCount);
      setDone(true);
    } catch (err) {
      console.log("error on form submission", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    if (done) setDone(false);
    const fieldName = e.target.name;
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const handleFieldBlur = (e) => {
    const fieldName = e.target.name;
    const validationMessage = validateField(fieldName, e.target.value);
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: validationMessage,
    }));
  };

  const handleFlipBack = () => {
    setDone(false);
    setError(null);
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
          className="flex justify-center px-1 sm:px-0"
        >
          <div className="w-full max-w-xl mx-auto [perspective:1200px]">
            <motion.div
              animate={{ rotateY: done ? 180 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative min-h-[680px] sm:min-h-[620px]"
            >
              <div
                style={{ backfaceVisibility: "hidden" }}
                className={`absolute inset-0 glass-effect rounded-2xl p-4 sm:p-6 md:p-7 flex flex-col ${
                  done ? "pointer-events-none" : ""
                }`}
              >
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 text-left">
                  Send a message
                </h4>
                <p className="text-xs text-slate-300 mb-3 sm:mb-4">
                  Please share your details and message.
                </p>

                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  className="flex flex-col gap-4 sm:gap-5 w-full flex-1"
                >
                  {contactConfig.fields.map((field) => (
                    <motion.div
                      key={field.id}
                      variants={formItemVariants}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="flex flex-col gap-2"
                    >
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
                          onBlur={handleFieldBlur}
                          className={`bg-transparent border text-white px-3 py-2.5 sm:py-3 rounded-lg placeholder:text-slate-400 focus:ring-2 focus:outline-none transition-colors resize-none ${
                            fieldErrors[field.name]
                              ? "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                              : "border-white/15 focus:border-cyan-300 focus:ring-cyan-400/40"
                          }`}
                        />
                      ) : (
                        <input
                          id={field.id}
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                          onChange={handleInputChange}
                          onBlur={handleFieldBlur}
                          className={`bg-transparent border text-white px-3 py-2.5 sm:py-3 rounded-lg placeholder:text-slate-400 focus:ring-2 focus:outline-none transition-colors ${
                            fieldErrors[field.name]
                              ? "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                              : "border-white/15 focus:border-cyan-300 focus:ring-cyan-400/40"
                          }`}
                        />
                      )}
                      {fieldErrors[field.name] && (
                        <p className="text-xs text-red-400 mt-1">
                          {fieldErrors[field.name]}
                        </p>
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    variants={formItemVariants}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mt-2 min-h-[1.5rem]"
                    aria-live="polite"
                  >
                    {error && <p className="text-sm text-red-400">{error}</p>}
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || hasReachedLimit}
                    variants={formItemVariants}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    whileHover={
                      isSubmitting || hasReachedLimit ? {} : { y: -1, scale: 1.01 }
                    }
                    whileTap={isSubmitting || hasReachedLimit ? {} : { scale: 0.99 }}
                    className="mt-2 sm:mt-auto flex w-full items-center justify-center self-stretch bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 px-6 sm:px-7 py-2.5 sm:py-3 cursor-pointer rounded-full text-sm font-semibold shadow-[0_8px_30px_rgba(34,211,238,0.35)] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:from-cyan-300 hover:to-emerald-300"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : hasReachedLimit
                        ? "Try again tomorrow"
                        : contactConfig.buttonLabel}
                  </motion.button>
                </motion.form>
              </div>

              <div
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                className="absolute inset-0 glass-effect rounded-2xl p-4 sm:p-6 md:p-7 flex flex-col justify-center items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center text-xl font-bold text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.25)] mb-4">
                  OK
                </div>
                <h4 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  Message sent
                </h4>
                <p className="text-slate-300 text-sm mb-4 sm:mb-5 max-w-sm">
                  Thanks for reaching out. Your message has been submitted successfully.
                </p>
                <p className="text-xs text-emerald-200 mb-5 sm:mb-6">
                  I will get back to you shortly.
                </p>

                <button
                  type="button"
                  onClick={handleFlipBack}
                  disabled={hasReachedLimit}
                  className="inline-flex items-center justify-center bg-white/10 text-white px-6 py-2.5 cursor-pointer rounded-full text-sm font-medium border border-white/20 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-white/15"
                >
                  {hasReachedLimit ? "Max submissions used" : "Send another"}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
