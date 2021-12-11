import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { Footer } from '..';
import { email } from '@config';
import { Icon } from '@components/icons';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .project-links {
    a {
      svg {
        width: 15px;
        height: 15px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;

  a {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: var(--fz-lg);
    letter-spacing: 0.1em;

    &:hover,
    &:focus {
      transform: translateY(-3px);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Shane Hoskin</h2>;
  const three = <h3 className="big-heading">I'm a Unity Programmer</h3>;
  const four = (
    <>
      <tabs>
        <column colSm={6} colLg={6}>
          <StyledLinkWrapper>
            <a href={`mailto:${email}`}>{email}</a>
          </StyledLinkWrapper>
        </column>
        <column colSm={6} colLg={6}>
          <div className="project-links">
            <a href="https://www.linkedin.com/in/shane-hoskin-b07410200/" aria-label="GitHub Link">
              <Icon name="Linkedin" />
            </a>
          </div>
        </column>
      </tabs>

      <p>
        My current goal is to find work as a Unity programmer fulltime. I am also Starting my own
        business as a solo Game Developer in my free time.
      </p>
      <p>
        Wanting to go into the field professionally I studied Advanced Diploma of Game Programming
        at AIE and have graduated from AIE Adelaide with a Graduate Diploma of Management (Learning)
        in 2021.
      </p>
      <p>
        My interest in game development started through game modding starting back in 2009 with
        Warcraft III and was active member at the Hive Workshop from 2010.
      </p>
    </>
  );
  /*const five = (
    <a
      className="email-link"
      href="https://www.newline.co/courses/build-a-spotify-connected-app"
      target="_blank"
      rel="noreferrer">
      Check out my course!
    </a>
  );*/

  const items = [one, two, three, four]; //, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
