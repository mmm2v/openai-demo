import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [wordsInput, setWordsInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words: wordsInput }),
      });

      const data = await response.json();
      console.log(data.result[0], 'ddd');
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result[0].url);
      setWordsInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>describe your image</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="words"
            placeholder="Enter key words"
            value={wordsInput}
            onChange={(e) => setWordsInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <img src={result}></img>
      </main>
    </div>
  );
}
