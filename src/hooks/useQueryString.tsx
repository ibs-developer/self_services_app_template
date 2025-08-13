/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFirstMountState } from '@react-hookz/web';
import { isFunction, isObject } from 'lodash';
import { ParsedQuery, StringifyOptions, parse, stringify } from 'query-string';
import React, {
  createContext,
  useContext,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useRouter, useGlobalSearchParams } from 'expo-router';

export type { ParsedQuery } from 'query-string';

export type QueryState = {
  searchObject: ParsedQuery<any>;
  updateQuery: UpdateQuery;
  searchString: string;
  deleteQuery: (queryKey?: string) => void;
};

type UpdateQuery = (
  value: any,
  options?: {
    cb?: (search: string) => void;
    replace?: boolean;
    noMerge?: boolean;
  },
) => void;

type UseQueryStringProvider = (init: any) => {
  searchObject: ParsedQuery<string>;
  updateQuery: UpdateQuery;
  searchString: string;
  deleteQuery: (queryKey?: string) => void;
};

type UseQueryString = () => [
  ParsedQuery<any>,
  UpdateQuery,
  string,
  (queryKey?: string) => void,
];

const queryStateCtx = createContext<QueryState>({
  searchObject: {},
  updateQuery: () => {},
  searchString: '',
  deleteQuery: () => {},
});
queryStateCtx.displayName = 'QueryStateCtx';

export const QueryStateProvider: React.FC<any> = (props) => {
  const { searchObject, updateQuery, searchString, deleteQuery } =
    useQueryStringProvider(props.initialQuery);

  const ctx: QueryState = {
    searchObject,
    updateQuery,
    searchString,
    deleteQuery,
  };

  return (
    <queryStateCtx.Provider value={ctx}>
      {props.children}
    </queryStateCtx.Provider>
  );
};

export const useQueryString: UseQueryString = () => {
  const { searchObject, updateQuery, searchString, deleteQuery } =
    useContext(queryStateCtx);

  return [searchObject, updateQuery, searchString, deleteQuery];
};

export const useQueryStringProvider: UseQueryStringProvider = (init) => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const { parse: parseQs, stringify: stringifyQs } = qs();

  const [searchObject, setSearchObject] = useState(
    parseQs(stringifyQs(params)),
  );
  const [searchString, setSearchString] = useState(stringifyQs(params));

  useLayoutEffect(() => {
    const newSearchString = stringifyQs(params);
    setSearchObject(parseQs(newSearchString));
    setSearchString(newSearchString);
  }, [params]);

  const updateQuery: UpdateQuery = (value, options) => {
    const { cb, replace, noMerge } = options || {};
    const newParams = noMerge ? value : { ...searchObject, ...value };
    const newSearchString = stringifyQs(newParams);

    setSearchObject(newParams);
    setSearchString(newSearchString);

    if (replace) {
      router.setParams(newParams);
    } else {
      router.push({ params: newParams });
    }

    if (isFunction(cb)) {
      cb(newSearchString);
    }
  };

  const deleteQuery = (queryKey?: string) => {
    let newParams;
    if (queryKey) {
      const { [queryKey]: deleted, ...restQueries } = searchObject;
      newParams = restQueries;
    } else {
      newParams = {};
    }

    setSearchObject(newParams);
    setSearchString(stringifyQs(newParams));
    router.setParams(newParams);
  };

  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (isFirstMount && init) {
      const initialParams = { ...searchObject, ...init };
      setSearchObject(initialParams);
      setSearchString(stringifyQs(initialParams));
      router.setParams(initialParams);
    }
  }, [isFirstMount]);

  useDebugValue({
    searchString,
    searchObject,
    router,
  });

  return {
    searchObject,
    updateQuery,
    searchString,
    deleteQuery,
  };
};

function qs(opt = {}) {
  const options: StringifyOptions = {
    arrayFormat: 'separator',
    arrayFormatSeparator: ':',
    ...opt,
  };

  return {
    stringify(o: any) {
      if (isObject(o)) {
        return stringify(o, options);
      }
      throw new Error(`qs cant stringify ${typeof o}`);
    },
    parse(o: any) {
      return Object.assign({}, parse(o, options));
    },
  };
}
