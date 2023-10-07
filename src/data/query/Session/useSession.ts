import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BASE_API_URL } from '~/core/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '~/core/hooks/useUrlQuery/useUrlQuery'
import { SessionEntity } from '~/data/entities/Session'
import SessionRepository from '~/data/repository/SessionRepository'

type UseResult = {
  data: SessionEntity[]
  total: number
}

type TQueryFnData = UseResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/session?`

export default function useSession(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/session'),
    () =>
      SessionRepository.api
        .get(urlQuery.transformUrl(endpointURL))
        .then((res) => res.data),
    { ...options }
  )

  return {
    ...query,
    data: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    helpers: urlQuery,
  }
}
