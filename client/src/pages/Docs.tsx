import { useSwagger } from '@/hooks/useSwagger'
import { Loader2 } from 'lucide-react'
import React from 'react'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const Docs: React.FC = () => {

    const { swagger,isLoading, error } = useSwagger()

    console.log(swagger)

    if (isLoading) {
        return (
            <div>
                <Loader2 className='animate-spin' />
                <span>Loading API docs...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <span className='text-red-700'>Error loading API docs</span>
            </div>
        )
    }

    return <SwaggerUI spec={swagger} />;

}

export default Docs
