import React, { useState } from "react";

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Update Profile</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Profession</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Interests</label>
            <textarea
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
         
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Facebook profile link"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Instagram profile link"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="LinkedIn profile Link"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="X (Formerly Twitter) profile link"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              onChange={handleProfilePictureChange}
            />
            {profilePicturePreview && (
              <img
                src={profilePicturePreview}
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
