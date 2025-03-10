import { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

export const useIntersection = (
	element: React.MutableRefObject<any>,
	rootMargin: string,
) => {
	const [isVisible, setState] = useState(false);

	useEffect(() => {
		const current = element?.current;
		const observer = new IntersectionObserver(
			([entry]) => {
				setState(entry.isIntersecting);
			},
			{ rootMargin },
		);
		current && observer?.observe(current);

		return () => current && observer.unobserve(current);
	}, []);

	return isVisible;
};

export const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		let timeoutId: number;
		if (isMounted && !shouldRender) {
			setShouldRender(true);
		} else if (!isMounted && shouldRender) {
			timeoutId = setTimeout(
				() => setShouldRender(false),
				delayTime,
			) as any;
		}
		return () => clearTimeout(timeoutId);
	}, [isMounted, delayTime, shouldRender]);
	return shouldRender;
};

export const styles = (...classNames: any[]) => {
	return cx(twMerge(...classNames));
};

export const useActiveAnchors = (
	firstHeadingSlug: string,
	anchorsQuerySelector: string = 'h2, h3, h4, h5, h6',
	tocQuerySelector: string = '.prose-toc',
	offset: number = 120,
) => {
	const anchors = useRef<NodeListOf<HTMLHeadingElement> | null>(null);
	const toc = useRef<NodeListOf<HTMLHeadingElement> | null>(null);

	const handleScroll = () => {
		const firstHeading = document.getElementById(firstHeadingSlug);
		const pageYOffset = window.scrollY;
		let newActiveAnchor: string = '';
		if (pageYOffset < 1) {
			return;
		}

		anchors.current?.forEach((anchor) => {
			if (pageYOffset >= anchor.offsetTop - offset) {
				if (!!anchor.id) {
					newActiveAnchor = anchor.id;
				}
			}
		});
		if (!newActiveAnchor) {
			firstHeading?.classList.remove('border-transparent');
			firstHeading?.classList.remove('text-grey');
			firstHeading?.classList.add('border-neon');
			firstHeading?.classList.add('text-white');
			return;
		}

		toc.current?.forEach((link) => {
			link.classList.remove('border-neon');
			link.classList.remove('text-white');
			link.classList.add('border-transparent');
			link.classList.add('text-grey');
			const sanitizedHref = (link.getAttribute('href') ?? '').replace(
				'#',
				'',
			);

			const isMatch = sanitizedHref === newActiveAnchor;

			if (isMatch) {
				link.classList.remove('border-transparent');
				link.classList.remove('text-grey');
				link.classList.add('text-white');
				link.classList.add('border-neon');
			}
		});
	};

	useEffect(() => {
		anchors.current = document.querySelectorAll(anchorsQuerySelector);
		toc.current = document.querySelectorAll(tocQuerySelector);

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return null;
};
