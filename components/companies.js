import {HiArrowSmRight} from "react-icons/hi";
import Link from "next/link";



const Companies = ({companyList}) => {

    return (
        <div className={'company-list'}>
            {companyList && companyList?.map((company, index) => (
                <div className={'company'} key={index}>
                    <Link href={'/company/[id]/'} as={`/company/${company.id}`}>
                        <a className={'c-name'}>
                        {company.name}
                        </a>
                    </Link>
                    <div className={'c-hover'}>
                        See company
                        <HiArrowSmRight className={'icon'}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Companies;