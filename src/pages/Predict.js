import React, { useState } from "react";
import axios from "axios";

const Predict = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    occupation: "",
    sleepDuration: "",
    qualityOfSleep: 5,
    activityLevel: 5,
    stressLevel: 5,
    bmiCategory: "",
    bloodPressure: "",
    heartRate: 60,
    dailySteps: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.gender) newErrors.gender = "Please select gender.";
    if (!data.age || Number(data.age) < 1) newErrors.age = "Please enter a valid age above 0.";
    if (!data.occupation) newErrors.occupation = "Please select occupation.";
    if (!data.sleepDuration || Number(data.sleepDuration) <= 0)
      newErrors.sleepDuration = "Please enter a sleep duration greater than 0.";

    const bpRegex = /^\d{2,3}\/\d{2,3}$/;
    if (!data.bloodPressure || !bpRegex.test(data.bloodPressure)) {
      newErrors.bloodPressure = "Enter valid blood pressure in systolic/diastolic format (e.g., 120/80).";
    }

    if (!data.dailySteps || Number(data.dailySteps) < 0)
      newErrors.dailySteps = "Enter valid number of steps.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    const updatedData = { ...formData, [name]: value };
    const newErrors = validateForm(updatedData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post("http://localhost:5001/predict", formData);
      setResult(response.data.prediction === "None" ? "No disorder" : response.data.prediction);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Something went wrong while getting the prediction.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.keys(validateForm(formData)).length === 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Sleep Assessment Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Personal Information</h3>

          <div className="mb-4">
            <label className="block font-medium">Gender:</label>
            <div className="flex gap-4 mt-1">
              <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
            </div>
            {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="border rounded p-2 w-full" />
            {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
          </div>

          <div>
            <label className="block font-medium">Occupation:</label>
            <select name="occupation" value={formData.occupation} onChange={handleChange} className="border rounded p-2 w-full">
              <option value="">Select</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Sales Representative">Sales Representative</option>
              <option value="Teacher">Teacher</option>
              <option value="Nurse">Nurse</option>
              <option value="Engineer">Engineer</option>
              <option value="Accountant">Accountant</option>
              <option value="Scientist">Scientist</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Salesperson">Salesperson</option>
            </select>
            {errors.occupation && <p className="text-red-600 text-sm">{errors.occupation}</p>}
          </div>
        </div>

        {/* Lifestyle */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Sleep & Lifestyle</h3>

          <div className="mb-4">
            <label className="block font-medium">Sleep Duration (hours):</label>
            <input type="number" step="0.1" name="sleepDuration" value={formData.sleepDuration} onChange={handleChange} className="border rounded p-2 w-full" />
            {errors.sleepDuration && <p className="text-red-600 text-sm">{errors.sleepDuration}</p>}
          </div>

          <div className="mb-6">
  <label className="block font-medium mb-1">
    Quality of Sleep: <span className="text-black-700 font-semibold">{formData.qualityOfSleep}</span>
    <span className="text-sm text-gray-500 ml-2">(1 - Very Poor, 10 - Excellent)</span>
  </label>
  <input
    type="range"
    min="1"
    max="10"
    name="qualityOfSleep"
    value={formData.qualityOfSleep}
    onChange={handleChange}
    className="w-full"
    disabled={Number(formData.sleepDuration) === 0}
  />
</div>

          <div className="mb-6">
  <label className="block font-medium mb-1">
    Physical Activity Level: <span className="text-black-700 font-semibold">{formData.activityLevel}</span>
    <span className="text-sm text-gray-500 ml-2">(1 - Low, 100 - High)</span>
  </label>
  <input
    type="range"
    min="1"
    max="100"
    name="activityLevel"
    value={formData.activityLevel}
    onChange={handleChange}
    className="w-full"
  />
</div>

<div className="mb-6">
  <label className="block font-medium mb-1">
    Stress Level: <span className="text-black-700 font-semibold">{formData.stressLevel}</span>
    <span className="text-sm text-gray-500 ml-2">(1 - Low, 10 - High)</span>
  </label>
  <input
    type="range"
    min="1"
    max="10"
    name="stressLevel"
    value={formData.stressLevel}
    onChange={handleChange}
    className="w-full"
  />
</div>
        </div>

        {/* Health Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Health Metrics</h3>

          <div className="mb-4">
            <label className="block font-medium">BMI Category:</label>
            <select name="bmiCategory" value={formData.bmiCategory} onChange={handleChange} className="border rounded p-2 w-full">
              <option value="">Select</option>
              <option value="Normal weight">Normal weight</option>
              <option value="Overweight">Overweight</option>
              <option value="Obese">Obese</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Blood Pressure:</label>
            <input type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="border rounded p-2 w-full" />
            {errors.bloodPressure && <p className="text-red-600 text-sm">{errors.bloodPressure}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Heart Rate: {formData.heartRate} bpm</label>
            <input type="range" min="40" max="140" name="heartRate" value={formData.heartRate} onChange={handleChange} className="w-full" />
          </div>

          <div>
            <label className="block font-medium">Daily Steps:</label>
            <input type="number" name="dailySteps" value={formData.dailySteps} onChange={handleChange} className="border rounded p-2 w-full" />
            {errors.dailySteps && <p className="text-red-600 text-sm">{errors.dailySteps}</p>}
          </div>
        </div>

        <button type="submit" disabled={!isFormValid || loading} className={`w-full py-3 rounded font-semibold transition ${!isFormValid || loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && (
        <div className="mt-10 p-6 rounded-xl shadow-lg bg-blue-50 text-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Prediction Result</h3>
          <p className="text-lg text-gray-800 mb-4">
            You are likely to have: <span className="text-blue-700 font-semibold">{result}</span>
          </p>

          {result === "No disorder" && (
            <div className="text-green-700">
              <p className="mb-2 font-semibold">No Sleep Disorder Detected</p>
              <p>Great job maintaining healthy sleep habits. Keep up your good routine and continue prioritizing your sleep.</p>
            </div>
          )}
          {result === "Insomnia" && (
            <div className="text-yellow-700">
              <p className="mb-2 font-semibold">Insomnia - Difficulty falling or staying asleep.</p>
              <ul className="list-disc list-inside">
                <li>Maintain a consistent sleep schedule.</li>
                <li>Avoid screens before bedtime.</li>
                <li>Try deep breathing or relaxation techniques.</li>
              </ul>
            </div>
          )}
          {result === "Sleep Apnea" && (
            <div className="text-red-700">
              <p className="mb-2 font-semibold">Sleep Apnea - Interrupted breathing during sleep.</p>
              <ul className="list-disc list-inside">
                <li>Consider a medical consultation or sleep study.</li>
                <li>Maintain a healthy weight.</li>
                <li>Avoid alcohol and smoking before bedtime.</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Visualization Block */}
      {result && isFormValid && Number(formData.sleepDuration) > 0 && (
        <div className="mt-8 p-4 bg-white rounded-lg shadow border">
          <h4 className="text-lg font-bold text-blue-800 mb-2">Comparison: Your Sleep vs. Recommended</h4>
          <p className="text-sm text-gray-700 mb-2">
            Recommended sleep duration (age {formData.age < 18 ? "<18" : formData.age <= 64 ? "18-64" : "65+"}): 
            <span className="ml-1 font-semibold">
              {formData.age < 18 ? "8-10 hrs" : formData.age <= 64 ? "7-9 hrs" : "7-8 hrs"}
            </span>
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-sm text-blue-900 font-semibold">Your Sleep:</span>
              <div className="w-full bg-blue-100 h-4 rounded">
                <div className="bg-blue-500 h-4 rounded" style={{ width: `${Math.min(formData.sleepDuration * 10, 100)}%` }}></div>
              </div>
            </div>

            <div>
              <span className="text-sm text-green-800 font-semibold">Recommended:</span>
              <div className="w-full bg-green-100 h-4 rounded">
                <div className="bg-green-500 h-4 rounded" style={{ width: `${formData.age < 18 ? 90 : formData.age <= 64 ? 80 : 75}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predict;