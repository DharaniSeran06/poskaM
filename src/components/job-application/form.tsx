"use client";
import React, { useState, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';

interface JobApplicationFormProps {
  initialPosition?: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ initialPosition = '' }) => {
  const t = useTranslations('jobApplication.form');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: initialPosition,
    message: "",
    website: "", // Honeypot field for spam prevention
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return t('errors.fullNameRequired');
        if (value.trim().length < 2) return t('errors.fullNameMinLength');
        return '';
      case 'email':
        if (!value.trim()) return t('errors.emailRequired');
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return t('errors.emailInvalid');
        return '';
      case 'phone':
        if (!value.trim()) return t('errors.phoneRequired');
        return '';
      case 'position':
        if (!value.trim()) return t('errors.positionRequired');
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        setErrors((prev) => ({ ...prev, file: t('errors.fileTypeInvalid') }));
        return;
      }

      // Validate file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: t('errors.fileSizeInvalid') }));
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.file;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    // Validate all required fields
    const newErrors: Record<string, string> = {};
    const requiredFields = ['fullName', 'email', 'phone', 'position'];
    
    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoader(false);
      return;
    }

    try {
      // Validate file is required
      if (!file) {
        setErrors({ file: t('errors.fileRequired') || 'Resume file is required' });
        setLoader(false);
        return;
      }

      // Prepare FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('language', locale); // Send current locale
      formDataToSend.append('website', formData.website); // Honeypot field
      formDataToSend.append('resume', file);

      // Send to API route
      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application');
      }

      // Success
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: initialPosition,
        message: "",
        website: "",
      });
      setFile(null);
      setFileName("");
      setErrors({});
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => setSubmitted(false), 10000);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      setErrors({ submit: error.message || t('errors.submitFailed') });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-white dark:bg-darklight rounded-xl shadow-lg p-8 md:p-10 border border-gray-200 dark:border-dark_border" data-aos="fade-up">
      <h2 className="text-2xl md:text-3xl font-bold text-midnight_text dark:text-white mb-6">
        {t('formTitle')}
      </h2>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-700 dark:text-green-300 rounded-lg" data-aos="fade-in">
          <p className="font-medium">{t('successMessage')}</p>
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg">
          <p className="font-medium">{errors.submit}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field for spam prevention (hidden) */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
        />

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
            {t('fields.fullName')} <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.fullName 
                ? 'border-red-500 dark:border-red-500' 
                : 'border-gray-300 dark:border-dark_border'
            } dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all`}
            placeholder={t('placeholders.fullName')}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Email and Phone - Two columns on desktop */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
              {t('fields.email')} <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email 
                  ? 'border-red-500 dark:border-red-500' 
                  : 'border-gray-300 dark:border-dark_border'
              } dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all`}
              placeholder={t('placeholders.email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
              {t('fields.phone')} <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone 
                  ? 'border-red-500 dark:border-red-500' 
                  : 'border-gray-300 dark:border-dark_border'
              } dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all`}
              placeholder={t('placeholders.phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Position Applied For */}
        <div>
          <label htmlFor="position" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
            {t('fields.position')} <span className="text-red-500">*</span>
          </label>
          <input
            id="position"
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.position 
                ? 'border-red-500 dark:border-red-500' 
                : 'border-gray-300 dark:border-dark_border'
            } dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all`}
            placeholder={t('placeholders.position')}
          />
          {errors.position && (
            <p className="mt-1 text-sm text-red-500">{errors.position}</p>
          )}
        </div>

        {/* Short Message / Cover Note */}
        <div>
          <label htmlFor="message" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
            {t('fields.message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark_border dark:text-white dark:bg-darkmode focus:border-[#016aac] dark:focus:border-[#016aac] focus:outline-none focus:ring-2 focus:ring-[#016aac]/20 transition-all resize-none"
            placeholder={t('placeholders.message')}
          />
        </div>

        {/* CV Upload */}
        <div>
          <label htmlFor="resume" className="block pb-2 text-base font-medium text-midnight_text dark:text-white">
            {t('fields.resume')} <span className="text-sm font-normal text-gray-500">({t('fileRequirements')})</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="resume"
              className="cursor-pointer inline-flex items-center px-6 py-3 bg-[#016aac]/10 text-[#016aac] rounded-lg hover:bg-[#016aac]/20 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {t('uploadFile')}
            </label>
            {fileName && (
              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {fileName}
              </span>
            )}
          </div>
          {errors.file && (
            <p className="mt-1 text-sm text-red-500">{errors.file}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loader}
            className="w-full bg-[#016aac] rounded-lg text-white py-4 px-8 font-semibold text-lg hover:bg-[#015a94] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-[1.02] transform"
          >
            {loader ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('submitting')}
              </span>
            ) : (
              t('submitButton')
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
