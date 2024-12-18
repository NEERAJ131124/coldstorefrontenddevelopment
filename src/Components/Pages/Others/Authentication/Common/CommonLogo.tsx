import React from 'react'
import { Link } from 'react-router-dom'
import { LoginFormProp } from '../../../../../Types/Others.type'
import { Image } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Utils'

export default function CommonLogo({ logoClass }: LoginFormProp) {
    return (
        <Link className={`logo ${logoClass}`} to={`${process.env.PUBLIC_URL}/dashboard/default`}>
            <Image className="img-fluid for-light m-auto" width={150} height={100}  src={dynamicImage(`logo/BMCLogoDark.webp`)} alt="looginpage" />
            <Image className="img-fluid for-dark" width={150} height={100}  src={dynamicImage(`logo/BMCLogoLight.webp`)} alt="looginpage" />
        </Link>
    )
}