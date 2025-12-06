import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { About } from "@/types/about";
import { FormSection } from "./FormSection";
import TextArea from "../form/input/TextArea";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { ImagePreview } from "./ImagePreview";

interface AboutFormProps {
  aboutData: About;
  onSubmit: (updates: Partial<About>) => void;
  errors?: Partial<Record<keyof About, string>>;
}

const defaultValues: About = {
  aboutId: undefined,
  image: "",
  title: "",
  description: "",
  mission: "",
  vision: "",
  email: "",
  phone: "",
  hotline: "",
  website: "",
  address: "",
  facebookUrl: "",
  zaloUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",
  category: "PTE English Center",
  mapUrl: "",
};

const AboutForm: React.FC<AboutFormProps> = ({ aboutData, onSubmit }) => {
  const [formData, setFormData] = useState<About>(aboutData || defaultValues);
  useEffect(() => {
    if (aboutData) {
      setFormData(aboutData);
    }
  }, [aboutData]);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        console.log("About data submitted:", formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(aboutData || defaultValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* GENERAL INFO */}
      <FormSection
        title="General Information"
        description="This content will be displayed on the About page of PTE iPASS."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT: Title + Description */}
          <div className="md:col-span-2 space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title ?? ""}
                placeholder="About PTE iPASS"
                onChange={handleChange}
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <TextArea
                value={formData.description ?? ""}
                placeholder="PTE iPASS is an English training center specialising in PTE Academic..."
                onChange={() => handleChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F6E10E] focus:border-transparent"
              />
            </div>
          </div>

          {/* RIGHT: Hero Image */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="image">Hero Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image ?? ""}
                placeholder="https://pteipass.com/images/about-cover.jpg"
                onChange={handleChange}
              />
            </div>

            <ImagePreview src={formData.image} />
          </div>
        </div>
      </FormSection>

      {/* CONTACT INFO */}
      <FormSection
        withTopBorder
        title="Contact Information"
        description="Official contact details for students and partners to reach PTE iPASS."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                placeholder="support@pteipass.com"
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                placeholder="+61 4xx xxx xxx"
                onChange={handleChange}
              />
            </div>

            {/* Hotline */}
            <div>
              <Label htmlFor="hotline">Hotline</Label>
              <Input
                id="hotline"
                name="hotline"
                value={formData.hotline}
                placeholder="1800 PTE IPASS"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* Website */}
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                placeholder="https://pteipass.com"
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <textarea
                id="address"
                name="address"
                value={formData.address ?? ""}
                placeholder="Level 3, PTE iPASS Building, Darwin City, NT, Australia"
                onChange={handleChange}
                rows={3}
                className="
                                    w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                                    focus:outline-none focus:ring-2 focus:ring-[#F6E10E] focus:border-transparent
                                "
              />
            </div>
          </div>
        </div>
      </FormSection>

      {/* MISSION & VISION */}
      <FormSection
        withTopBorder
        title="Mission & Vision"
        description="Share the core values and long-term direction of PTE iPASS."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="space-y-2">
            <Label htmlFor="mission">Mission</Label>
            <TextArea
              value={formData.mission ?? ""}
              placeholder="To help students achieve their PTE target scores..."
              onChange={() => handleChange}
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F6E10E] focus:border-transparent"
            />
          </div>

          {/* Vision */}
          <div className="space-y-2">
            <Label htmlFor="vision">Vision</Label>
            <TextArea
              value={formData.vision ?? ""}
              placeholder="To become the most trusted PTE preparation brand..."
              onChange={() => handleChange}
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F6E10E] focus:border-transparent"
            />
          </div>
        </div>
      </FormSection>

      {/* SOCIAL & MAP */}
      <FormSection
        withTopBorder
        title="Social Channels & Map"
        description="Connect your official social media and map location for students."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="facebookUrl">Facebook Page URL</Label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                value={formData.facebookUrl}
                placeholder="https://www.facebook.com/pteipass"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="zaloUrl">Zalo URL</Label>
              <Input
                id="zaloUrl"
                name="zaloUrl"
                value={formData.zaloUrl}
                placeholder="Zalo link if available"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="tiktokUrl">TikTok URL</Label>
              <Input
                id="tiktokUrl"
                name="tiktokUrl"
                value={formData.tiktokUrl}
                placeholder="https://www.tiktok.com/@pteipass"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="youtubeUrl">YouTube URL</Label>
              <Input
                id="youtubeUrl"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                placeholder="https://www.youtube.com/@pteipass"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <Label>Description</Label>
        <TextArea
          hint="Google Map Embed URL"
          value={formData.mapUrl}
          placeholder="https://www.google.com/maps/embed?..."
          onChange={() => handleChange}
          rows={6}
        />
      </FormSection>

      {/* ACTIONS */}
      <div className="border-t border-gray-200 pt-6 flex items-center justify-end gap-3">
        <Button size="sm" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button
          size="sm"
          variant="primary"
          disabled={isSubmitting}
          className="bg-[#F6E10E] text-black hover:bg-[#e2d00d] border-none"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
};

export default AboutForm;
