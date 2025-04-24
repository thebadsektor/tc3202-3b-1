import { useState } from "react";
import EssayInput from "./EssayInput";
import Resultcol from "./Resultcol";
import Secondnav from "../Components/Secondnav";

function Grammarpage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState([]);

  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 250;

  const [metrics, setMetrics] = useState({
    grammar: 0,
    fluency: 0,
    clarity: 0,
    engagement: 0,
    writingScore: 0,
    errorPercentage: 0
  });

  const handleTextChange = (newText) => {
    setText(newText);
    const words = newText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleCheckGrammar = async () => {
    if (!text.trim()) {
      alert("Please enter or upload text to check.");
      return;
    }

    if (wordCount > wordLimit) {
      alert(`Word limit exceeded! Maximum allowed is ${wordLimit} words.`);
      return;
    }

    setIsLoading(true);

    try {
      const grammarIssues = await checkGrammar(text);
      const correctedText = applyCorrections(text, grammarIssues);

      setResult(correctedText);
      setIssues(grammarIssues);

      const errorCount = grammarIssues.length;
      const errorPercentage = Math.min(100, Math.round((errorCount / wordCount) * 100));

      const computedMetrics = {
        grammar: Math.max(0, 100 - errorPercentage),
        fluency: Math.min(100, 75 + Math.random() * 20),
        clarity: Math.min(100, 65 + Math.random() * 25),
        engagement: Math.min(100, 70 + Math.random() * 25),
      };

      const writingScore = Math.round(
        (computedMetrics.grammar + computedMetrics.fluency + computedMetrics.clarity + computedMetrics.engagement) / 4
      );

      setMetrics({
        ...computedMetrics,
        writingScore,
        errorPercentage
      });

    } catch (error) {
      console.error("Error checking grammar:", error);
      alert("An error occurred while checking grammar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const checkGrammar = async (text) => {
    const response = await fetch("https://api.languagetoolplus.com/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: text,
        language: "en-US"
      }),
    });

    const data = await response.json();

    const issues = data.matches.map(match => ({
      start: match.offset,
      end: match.offset + match.length,
      original: text.substring(match.offset, match.offset + match.length),
      suggestion: match.replacements[0]?.value || "",
      type: match.rule.issueType,
      message: match.message
    }));

    return issues;
  };

  const applyCorrections = (text, issues) => {
    let correctedText = text;
    const sortedIssues = [...issues].sort((a, b) => b.start - a.start);

    sortedIssues.forEach(issue => {
      correctedText =
        correctedText.substring(0, issue.start) +
        issue.suggestion +
        correctedText.substring(issue.end);
    });

    return correctedText;
  };

  return (
    <>
      <Secondnav title="Grammar checker" />
      <div className="flex items-center justify-center min-h-screen bg-bgcolor">
        <div className="bg-gray-300 rounded-2xl grid-cols-2 grid justify-items-center items-center h-120 w-5/6">
          <EssayInput
            text={text}
            onTextChange={handleTextChange}
            onCheck={handleCheckGrammar}
            isLoading={isLoading}
            wordCount={wordCount}
            wordLimit={wordLimit}
          />
          <Resultcol
            result={result}
            issues={issues}
            originalText={text}
            isLoading={isLoading}
            metrics={metrics}
          />
        </div>
      </div>
    </>
  );
}

export default Grammarpage;
