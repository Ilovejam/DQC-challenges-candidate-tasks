import { FontIcon, initializeIcons, Stack } from "@fluentui/react";
import { SurveyFreeText } from "./components/surveys/survey-free-text";
import surveyResults from "./data/survey_results"; // importing JSON data
initializeIcons();

function App() {
  // Get pinion scale responses 
  const opinionScaleResponses: number[] = surveyResults.questions
    .filter((question: any) => question.type === "number")
    .flatMap((question: any) => question.responses);

  // Calculate Happiness score'u  (get averange of opinion scale responses)
  const happinessScore: number =
    opinionScaleResponses.reduce((sum, response) => sum + response, 0) /
    opinionScaleResponses.length;

  return (
    <Stack style={{ margin: 20 }}>
      <h1>
        <FontIcon iconName="ClipboardList" style={{ marginRight: "5px" }} />
        {surveyResults.survey_title} {/* Survey starts */}
      </h1>

      <h1 data-testid="happinessScore">
        <FontIcon iconName="ChatBot" style={{ marginRight: "5px" }} />
        {Math.round(happinessScore)} / 100
      </h1>
      <Stack>
        <SurveyFreeText /> {/* Calling SurveyFreeText component */}
      </Stack>
    </Stack>
  );
}

export default App;
