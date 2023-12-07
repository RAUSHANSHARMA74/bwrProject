import { useState, useEffect } from "react";

function Career() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [careerData, setCareerData] = useState({
    full_name: "",
    phone_number: "",
    email_id: "",
    address: "",
    post: "",
    cv: "",
    message: "",
    captcha: "",
  });

  const generateRandomFourDigitNumber = () => {
    const min = 1000; // Minimum value for a four-digit number
    const max = 9999; // Maximum value for a four-digit number
    const randomFourDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomFourDigitNumber);
  };

  useEffect(() => {
    generateRandomFourDigitNumber()
  }, []);

  const handleCareer = (e) => {
    setCareerData((prevFilter) => ({
      ...prevFilter,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault(); 
    console.log(careerData);
  };

  return (
    <div className="career_container bg-gray-100 lg:py-5">
      <div className="form_container mx-auto bg-white p-4 lg:p-8 rounded shadow-md">
        <div className="form_header mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Career opportunities in RBA Realtors
          </h1>
          <p className="text-gray-400">
            Want to start a career in real estate business? Do you see yourself
            becoming a successful face in the real estate business? Then your
            chance is here. Apply at RBA Realtors with your CV and we will
            contact you back.
          </p>
        </div>
        <div className="form" onSubmit={handleSubmitForm}>
          <form action="" >
            <div className="name-phone grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="full_name">
                <span className="block mb-1 lg:text-lg">Full Name :</span>
                <input
                  type="text"
                  id="full_name"
                  placeholder="Full Name"
                  className="w-full border lg:text-xl outline-none border-gray-300 rounded px-3 py-2"
                  value={careerData.full_name}
                  onChange={handleCareer}
                  required
                />
              </div>
              <div className="phone_no mt-0 md:mt-0">
                <span className="block mb-1 lg:text-lg">Phone No :</span>
                <input
                  type="tel"
                  pattern="\d{10}"
                  placeholder="Phone Number"
                  id="phone_number"
                  value={careerData.phone_number}
                  onChange={handleCareer}
                  className="w-full border border-gray-300 lg:text-xl outline-none rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="email-address grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="email">
                <span className="block mb-1 lg:text-lg">Email ID :</span>
                <input
                  type="email"
                  placeholder="Email ID"
                  id="email_id"
                  value={careerData.email_id}
                  onChange={handleCareer}
                  className="w-full border border-gray-300 rounded lg:text-xl outline-none px-3 py-2"
                  required
                />
              </div>
              <div className="address mt-0 md:mt-0">
                <span className="block mb-1 lg:text-lg">Address :</span>
                <input
                  type="text"
                  placeholder="Address"
                  id="address"
                  value={careerData.address}
                  onChange={handleCareer}
                  className="w-full border border-gray-300 lg:text-xl outline-none rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="post-cv grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="post">
                <span className="block mb-1 lg:text-lg">
                  Post Applying For :
                </span>
                <select
                  id="post"
                  value={careerData.post}
                  onChange={handleCareer}
                  className="w-full border border-gray-300 rounded-lg text-xl outline-none px-3 py-2"
                  required
                >
                  <option disabled value="">
                    Select Post
                  </option>
                  <option value="sales">Sales</option>
                  <option value="sales_marketing">Sales & Marketing</option>
                  <option value="marketing">Marketing</option>
                  <option value="any">Any</option>
                </select>
              </div>
              <div className="cv mt-0 md:mt-0">
                <span className="block mb-1 lg:text-lg">
                  Attach CV{" "}
                  <span className="text-gray-400 text-sm">
                    (Upload, doc, docx, pdf files within 2MB size only)
                  </span>{" "}
                  :
                </span>
                <div className="file">
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded lg:text-xl outline-none px-3 py-2"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="message mb-4">
              <span className="block mb-1 lg:text-lg">Message :</span>
              <textarea
                placeholder="Message"
                id="message"
                value={careerData.message}
                onChange={handleCareer}
                className="w-full border border-gray-300 rounded-lg text-xl outline-none px-3 py-2"
              ></textarea>
            </div>
            <div className="captcha-uploadBtn  grid grid-cols-1 md:grid-cols-2 gap-4 md:align-middle lg:mt-8">
              <div className="captcha flex">
                <span className="px-1 bg-blue-500 rounded justify-center text-white font-bold items-center  flex">
                  {randomNumber}
                </span>
                <input
                  type="text"
                  id="captcha"
                  value={careerData.captcha}
                  onChange={handleCareer}
                  className="w-full border border-gray-300 rounded lg:text-xl outline-none px-3 py-2"
                  required
                />
              </div>
              <div className="upload_cv mt-4 md:mt-0">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 w-full py-2 lg:text-xl lg:font-bold rounded"
                >
                  Upload CV
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Career;
