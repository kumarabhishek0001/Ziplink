import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import QRCodeGenerator from "qrcode";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState("");

  const handleShorten = async () => {
    if (!url) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/api/urls/shorten`, {
        originalURL: url,
      });

      const newShortURL = res.data.shortURL;
      setShortUrl(newShortURL);
      setCopied(false);

      const qr = await QRCodeGenerator.toDataURL(newShortURL);
      setQrImage(qr);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-4xl font-bold mb-4 text-center">URL Shortner</h1>

      <div className="flex flex-col gap-3 w-full max-w-3xl">
        <input
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          placeholder="Enter long url"
          type="text"
          className="input input-success w-full"
        />
        <button
          onClick={handleShorten}
          className="btn btn-primary w-full sm:w-auto"
        >
          Shorten
        </button>
      </div>

      {shortUrl && (
        <div className="flex flex-col items-center max-w-3xl ">
          <p className="font-medium mb-2">Short Link</p>
          <a target="_blank" className="link link-primary break-all" href={shortUrl}>
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className={`btn mt-2 w-full ${copied ? "btn-success" : "btn-secondary"}`}
          >
            {copied ? "Copied!!" : "Copy"}
          </button>

          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <p className="mb-2 text-center font-semibold text-gray-800">
              Scan QR Code
            </p>
            <QRCode value={shortUrl} size={180} />
          </div>

          {qrImage && (
            <a
              className="btn btn-accent mt-3 w-full"
              download="qr-code.png"
              href={qrImage}
            >
              Download QR Code
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
