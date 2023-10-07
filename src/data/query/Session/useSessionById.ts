import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BASE_API_URL } from '~/core/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '~/core/hooks/useUrlQuery/useUrlQuery'
import { SessionEntity } from '~/data/entities/Session'
import SessionRepository from '~/data/repository/SessionRepository'

type UseResult = SessionEntity

type TQueryFnData = UseResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/session`

export default function useSessionById(
  id: string,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(['/session-by-id', id]),
    () =>
      SessionRepository.api
        .get(urlQuery.transformUrl(`${endpointURL}/${id}`))
        .then((res) => res.data),
    {
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      select: (res: any) => res?.data,
      enabled: Boolean(id),
      ...options,
    }
  )

  return {
    ...query,
    helper: urlQuery,
  }
}
