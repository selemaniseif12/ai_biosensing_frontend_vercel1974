"use client";
import { useState } from "react";

export default function Compare({ token }) {
    const [inputA, setInputA] = useState("");
    const [inputB, setInputB] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const runCompare = async () => {
        setLoading(true);
        setResult(null);

        const response = await fetch("http://localhost/compare/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                payload: {
                    sampleA: inputA,
                    sampleB: inputB
                }
            })
        });

        const data = await response.json();
        setResult(data.result || data);
        setLoading(false);
    };

    return (
        <div className="compare-ui">
            <h2>Compare v2/v6</h2>

            <div className="input-section">
                <textarea
                    placeholder="Sample A"
                    value={inputA}
                    onChange={(e) => setInputA(e.target.value)}
                />

                <textarea
                    placeholder="Sample B"
                    value={inputB}
                    onChange={(e) => setInputB(e.target.value)}
                />
            </div>

            <button onClick={runCompare} disabled={loading}>
                {loading ? "Processing..." : "Run Compare"}
            </button>

            {result && (
                <div className="result-box">
                    <h3>Result</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
