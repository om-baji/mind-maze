import { useSwagger } from '@/hooks/useSwagger'
import { Loader2 } from 'lucide-react'
import React from 'react'
import SwaggerUI from 'swagger-ui-react'

const Docs: React.FC = () => {
    const { isLoading, error, data } = useSwagger()
    console.log(data)
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin w-6 h-6" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                Failed to load API documentation.
            </div>
        )
    }

    return <SwaggerUI spec={data} />
}

export default Docs
