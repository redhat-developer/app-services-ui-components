import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons";
import { useEffect, useReducer, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { SearchProps } from "./Search";
import { SearchChips } from "./SearchChips";
import { SearchCategory } from "../types";

const initialState: State = {
  clientid: [],
  description: [],
  owner: [],
};

export type ServiceAccountToolbarProps = {
  onSearch: (search: State) => void;
  onCreateServiceAccountClick: () => void;
};

export const ServiceAccountToolbar: VoidFunctionComponent<
  ServiceAccountToolbarProps
> = ({ onSearch, onCreateServiceAccountClick }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch: SearchProps["onSearch"] = (category, value) => {
    dispatch({
      type: "search",
      category,
      value,
    });
  };

  const handleDeleteChip = (category: SearchCategory, chip: string) => {
    dispatch({
      type: "removeChip",
      category,
      value: chip,
    });
  };

  const handleDeleteChipGroup = (category: SearchCategory) => {
    dispatch({
      type: "removeGroup",
      category,
    });
  };

  const handleClearAllFilters = () => {
    dispatch({
      type: "clearAll",
    });
  };

  // communicate back any change on the state to allow a parent component to
  // react on a change on the search topic
  useEffect(() => {
    onSearch(state);
  }, [onSearch, state]);

  return (
    <Toolbar
      id="service-account-toolbar"
      collapseListedFiltersBreakpoint={"md"}
      inset={{ xl: "insetLg" }}
      clearAllFilters={handleClearAllFilters}
    >
      <ToolbarContent>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
          <SearchChips
            clientIdChips={state.clientid}
            descriptionChips={state.description}
            ownerChips={state.owner}
            onSearch={handleSearch}
            onDeleteChip={handleDeleteChip}
            onDeleteChipGroup={handleDeleteChipGroup}
          />
        </ToolbarToggleGroup>
        <ToolbarGroup>
          <ToolbarItem>
            <Button variant={"primary"} onClick={onCreateServiceAccountClick}>
              {t("service-account:create_service_account")}
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};

type State = {
  [category in SearchCategory]: string[];
};

type Actions =
  | {
      type: "search";
      category: SearchCategory;
      value: string;
    }
  | {
      type: "removeChip";
      category: SearchCategory;
      value: string;
    }
  | {
      type: "removeGroup";
      category: SearchCategory;
    }
  | {
      type: "clearAll";
    };

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case "search": {
      const newChips = [...state[action.category], action.value];
      const uniqueChips = new Set(newChips);
      return {
        ...state,
        [action.category]: Array.from(uniqueChips),
      };
    }
    case "removeChip":
      return {
        ...state,
        [action.category]: state[action.category].filter(
          (v) => v !== action.value
        ),
      };
    case "removeGroup":
      return {
        ...state,
        [action.category]: [],
      };
    case "clearAll": {
      return initialState;
    }
    default:
      return { ...state };
  }
}
