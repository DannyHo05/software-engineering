import { ProfileType } from '@/models/common'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/_internal'


export function useAuth(options?: Partial<PublicConfiguration>){
    const {data:profile, error, mutate} = useSWR<any>('/rest/profile',{
        dedupingInterval:1000,
        revalidateOnFocus:false,
        ...options
    })

    return {
        profile
    }
}