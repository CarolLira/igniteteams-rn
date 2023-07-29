import {
    Container,
    Logo,
    BackButton,
    BackIcon,
} from "./styles";

type Props = {
    showBackButton?: boolean;
}

import logoImg from '@assets/logo.png';
import React from "react";

export function Header({ showBackButton = false }: Props) {
    return (
        <Container>
            {
                showBackButton &&
                <BackButton>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg} />
        </Container>

    );
}