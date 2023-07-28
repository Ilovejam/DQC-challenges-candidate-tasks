import { CheckboxVisibility, DetailsList, Stack } from "@fluentui/react";
import { FunctionComponent } from "react";
import surveyResults from "../../data/survey_results"; // JSON verisini import ediyoruz

export const SurveyFreeText: FunctionComponent = () => {
  const freeTextResponses = (surveyResults.questions
    .filter((question) => question.type === "text")
    .map((question) => question.responses) as any[][]) // Dönüştürülmüş tür
    .reduce((acc, responses) => acc.concat(responses), []);

  const _onRenderColumn = (item?: any) => {
    return <div data-is-focusable={true}>{item}</div>;
  };
  return (
    <Stack data-testid="FreeTextTable">
      <DetailsList
        checkboxVisibility={CheckboxVisibility.hidden}
        items={freeTextResponses}
        columns={[{ key: "Free text", name: "Free text", minWidth: 200 }]}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="select row"
        checkButtonGroupAriaLabel="select section"
        groupProps={{
          isAllGroupsCollapsed: true,
          showEmptyGroups: true,
        }}
        onRenderItemColumn={_onRenderColumn}
        compact={true}
      />
    </Stack>
  );
};
