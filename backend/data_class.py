from typing import Dict, Any, List, Tuple
import pandas as pd
import numpy as np

# - **UNIFORMITY** Is the data in the same format (per column)?
# - **DUPLICATES** Are no duplicates in the data?
# - **MISSING VALUES** Are there any null / missing values?
# - **OUTLIERS** Any outliers in the data (per column)?

column_name = str


class DataClass:
    def __init__(self, path: str, separator: str = ",") -> None:
        self.df: pd.DataFrame = pd.read_csv(path, sep=separator)

    def check_uniformity(self) -> Dict[column_name, List[int]]:
        # Return a dict mapping column name to a list of row indexes which are not uniform
        result = {}
        for col in self.df.columns:
            unique_formats = self.df[col].apply(lambda x: type(x).__name__).unique()
            if len(unique_formats) > 1:
                non_uniform_rows = self.df.index[self.df[col].apply(lambda x: type(x).__name__) != unique_formats[0]]
                result[col] = non_uniform_rows.tolist()
        return result

    def check_duplicates(self) -> List[Tuple[int]]:
        # Return a list of tuples of row indexes where each tuple represents a duplicate group
        return [tuple(indexes) for indexes in self.df[self.df.duplicated(keep=False)].groupby(self.df.columns.tolist()).groups.values()]


    def check_missing_values(self) -> List[int]:
        # Return the row indexes which contain empty values
        return self.df.index[self.df.isnull().any(axis=1)].to_list()

    def check_outliers(self) -> Dict[column_name, List[int]]:
        # Outliers are defined by the 1.5 IQR method.
        # see https://towardsdatascience.com/why-1-5-in-iqr-method-of-outlier-detection-5d07fdc82097
        # for a detailed explanation
        # Return a dict mapping column name to a list of row indexes which are outliers
        result = {}
        for col in self.df.select_dtypes(include=[np.number]).columns:
            Q1 = self.df[col].quantile(0.25)
            Q3 = self.df[col].quantile(0.75)
            IQR = Q3 - Q1
            outliers = self.df.index[(self.df[col] < Q1 - 1.5 * IQR) | (self.df[col] > Q3 + 1.5 * IQR)].to_list()
            result[col] = outliers
        return result


    def generate_report(self) -> Dict[str, List[int]]:
        report = {
            "UNIFORMITY": self.check_uniformity(),
            "DUPLICATE_ROWS": self.check_duplicates(),
            "MISSING_VALUE_ROWS": self.check_missing_values(),
            "OUTLIERS": self.check_outliers(),
        }
        return report
