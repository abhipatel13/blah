import HomeKindergarten from '../components/homes/home-kindergarten';
import SEO from '../components/seo';
import { Wrapper } from '../layout';

export default function Home() {
    return (
        <Wrapper>
            <SEO pageTitle={'IPlus Coding'} />
            <HomeKindergarten />
        </Wrapper>
    )
}