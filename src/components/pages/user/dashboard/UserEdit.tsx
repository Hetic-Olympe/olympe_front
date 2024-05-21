import Header from '@/components/sections/Header/Header';
import PageTemplate from '@/components/sections/PageTeample/PageTemplate';
import { useParams } from 'react-router-dom';

export default function UserEdit() {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <Header title="Edit a user" subtitle="Edit or show information on a specific user" />
            <PageTemplate>
                <div>Edit user : {id}</div>
            </PageTemplate>
        </>
    );
}