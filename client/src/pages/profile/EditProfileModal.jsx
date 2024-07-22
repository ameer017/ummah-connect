import React, { useEffect, useLayoutEffect, useState } from "react";
import { getUser, updateUser } from "../../redux/feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; 

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const initialState = {
    profession: user?.profession || "",
    location: user?.location || "",
    interests: user?.interests || "",
    photo: user?.photo || "",
    socialMediaLinks: {
      facebook: user?.socialMediaLinks?.facebook || "",
      instagram: user?.socialMediaLinks?.instagram || "",
      linkedin: user?.socialMediaLinks?.linkedin || "",
      twitter: user?.socialMediaLinks?.twitter || "",
    },
  };

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      socialMediaLinks: { ...profile.socialMediaLinks, [name]: value },
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // Save image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dcb8hrswl/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      // Save profile to MongoDB
      const userData = {
        profession: profile.profession,
        location: profile.location,
        interests: profile.interests,
        photo: profileImage ? imageURL : profile.photo,
        socialMediaLinks: profile.socialMediaLinks,
      };

      await dispatch(updateUser(userData));
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        profession: user.profession,
        location: user.location,
        interests: user.interests,
        photo: user.photo,
        socialMediaLinks: user.socialMediaLinks || {
          facebook: "",
          instagram: "",
          linkedin: "",
          twitter: "",
        },
      });
    }
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Update Profile</h2>
        <form onSubmit={saveProfile}>
          <div className="flex justify-between">
            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700">Profession</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                name="profession"
                value={profile.profession}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Interests</label>
            <textarea
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              name="interests"
              value={profile.interests}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-between">
            <div className="mb-4 w-[48%] ">
              <label className="block text-gray-700">Facebook</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                name="facebook"
                value={profile.socialMediaLinks.facebook}
                onChange={handleSocialMediaChange}
                placeholder="Facebook profile link"
              />
            </div>
            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700">Instagram</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                name="instagram"
                value={profile.socialMediaLinks.instagram}
                onChange={handleSocialMediaChange}
                placeholder="Instagram profile link"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700">LinkedIn</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                name="linkedin"
                value={profile.socialMediaLinks.linkedin}
                onChange={handleSocialMediaChange}
                placeholder="LinkedIn profile link"
              />
            </div>
            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700">Twitter</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                name="twitter"
                value={profile.socialMediaLinks.twitter}
                onChange={handleSocialMediaChange}
                placeholder="X (Formerly Twitter) profile link"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="mt-4 w-24 h-24 rounded-full"
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
