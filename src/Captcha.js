import { useEffect, useRef, useState } from "react";

function Captcha() {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaText = "";

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate random text
    for (let i = 0; i < 6; i++) {
      captchaText += chars[Math.floor(Math.random() * chars.length)];
    }

    // Set the CAPTCHA text
    setCaptchaText(captchaText);

    // Draw the text on the canvas
    ctx.font = "30px Arial";
    ctx.fillText(captchaText, 10, 30);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the user input against the captcha text
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      alert("CAPTCHA validated successfully!");
    } else {
      alert("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      setUserInput("");
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={200} height={50} />
      <form
      //    onSubmit={handleSubmit}
      >
        <input type="text" value={userInput} onChange={handleChange} />
        <button onClick={handleSubmit}>verify captcha</button>
      </form>
    </div>
  );
}

export default Captcha;
