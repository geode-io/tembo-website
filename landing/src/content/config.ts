import { defineCollection, z, type CollectionEntry } from 'astro:content';

export interface Author {
	name: string;
	title?: string;
	url?: string;
	image_url: string;
	email?: string;
}

export interface BlogCollection {
	title?: string;
	description?: string;
	date: Date;
	updatedDate?: Date;
	image?: string;
	tags: string[];
	authors: string[];
}

export const TAGS = [
	'All',
	'Postgres',
	'Engineering',
	'Developers',
	'Data',
	'Extensions',
	'Stacks',
];

export const AUTHORS: Record<string, Author> = {
	ryw: {
		name: 'Ry Walker',
		title: 'Founder/CEO',
		url: 'https://github.com/ryw',
		image_url: 'https://github.com/ryw.png',
		email: 'noreply@tembo.io',
	},
	samay: {
		name: 'Samay Sharma',
		title: 'CTO',
		url: 'https://github.com/samay-sharma',
		image_url: 'https://github.com/samay-sharma.png',
		email: 'noreply@tembo.io',
	},
	adam: {
		name: 'Adam Hendel',
		title: 'Founding Engineer',
		url: 'https://github.com/ChuckHend',
		image_url: 'https://github.com/chuckhend.png',
		email: 'noreply@tembo.io',
	},
	rjzv: {
		name: 'Binidxaba',
		title: 'Community contributor',
		url: 'https://github.com/binidxaba',
		image_url: 'https://github.com/binidxaba.png',
		email: 'noreply@tembo.io',
	},
	steven: {
		name: 'Steven Miller',
		title: 'Founding Engineer',
		url: 'https://github.com/sjmiller609',
		image_url: 'https://github.com/sjmiller609.png',
		email: 'noreply@tembo.io',
	},
	jay: {
		name: 'Jay Kothari',
		title: 'Software Engineering Intern',
		url: 'https://github.com/Jayko001',
		image_url: 'https://github.com/Jayko001.png',
		email: 'noreply@tembo.io',
	},
	adarsh: {
		name: 'Adarsh Shah',
		url: 'https://github.com/shahadarsh',
		image_url: 'https://github.com/shahadarsh.png',
		email: 'noreply@tembo.io',
	},
	eric: {
		name: 'Eric Ankenman',
		url: 'https://github.com/ericankenman',
		image_url: 'https://github.com/ericankenman.png',
		email: 'noreply@tembo.io',
	},
	ian: {
		name: 'Ian Stanton',
		title: 'Founding Engineer',
		url: 'https://github.com/ianstanton',
		image_url: 'https://github.com/ianstanton.png',
		email: 'noreply@tembo.io',
	},
	darren: {
		name: 'Darren Baldwin',
		title: 'Engineer',
		url: 'https://github.com/DarrenBaldwin07',
		image_url: 'https://github.com/darrenbaldwin07.png',
		email: 'noreply@tembo.io',
	},
	abby: {
		name: 'Abby Owens',
		title: 'Growth',
		url: 'https://www.linkedin.com/in/abbyowensnc/',
		image_url:
			'https://lh3.googleusercontent.com/a-/ALV-UjWTN5Qpmq5GSCj8MN0mONKWlMMk32wJQtrvTI2v2WRBkif2960k4t6pJ1vn6mt20e5Ey7P2q7nUJuAAO1W5AyiAx107PEPKRyE9ifCbiUXVsFmYvWmg538bdl01DJPtZP2-8fCb1g3YmiQLOqXf9PhnKqt2kCqFWt23TokM-w3CaBZFxjx54ztaY4BToZPjKJdpvvCLT_TR73JkfrYsBqmYdmRX9824h9CTF3B9QaBGXP5SKiZpPrsdBROvj502nVQ-T9ZCqt7rqwUeeIWDLJTCJKSrkSnfYejLOwonNJMrDls9ZD6_0H5AbMsLwlUnXi14JjydBJgAYKh6DiKZsU7SuChcm8LSytKQaTKj_Wmhb26F4AwjShn48uxuwjiHB_PjH3csVjgjTdGdI_md_opYQumOdcAYw299FJcczW2BX7wYtp4O-DMTfxAssayiS5C8jBlnC564nn8CfTeuDVXRs5ImJ6ILAgi-Y3V6NfDDoDzvrtcTHDJ6ufKWiBAr9898gkLCJ0wFU5AhFuGdlUkGRONmmDz4Ply3kAwHz3HjvQWe9nnGAfy673B85eMA7vKhxXJd14ldc-EByVAfgH_pGqaedi21AUfq5BjOBuceKb69CuKWuINJ3HMpKBaUQZ7ETn17_oXfQkauUAR9yJJlCf8Vfr1r6PRU_uAm-EFTSqEheEg3-3qsjux2Iw_0fEOIkYtpWp1zBRQocKKe9ztSDqKUMPA_G_tK2apI_GfEj_v-KyFPDKUbg4kKGP25lhNWFrEuX9WGFrrlJkRHGuP3jqAicpYgDcvRku0nL-Bf9_Lz3h16TxV9NeHAVKWxxnxpJdZn0m9UsOse9L1G3ZKNLLm5k6oTAbJOET6v_5e3vpSRdh-eaY6j0lrZEOT9I2INru03167BEOjEzEqTyLUUC4A-7D0XBi1WgtAc93N2Bg=s576-c-no',
		email: 'noreply@tembo.io',
	},
	evan: {
		name: 'Evan Stanton',
		title: 'Software Engineer',
		url: 'https://github.com/EvanHStanton',
		image_url: 'https://github.com/EvanHStanton.png',
		email: 'noreply@tembo.io',
	},
	theory: {
		name: 'David E. Wheeler',
		title: 'Principal Architect',
		url: 'https://justatheory.com',
		image_url: 'https://github.com/theory.png',
		email: 'noreply@tembo.io',
	},
};

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		image: z.string().optional(),
		tags: z.array(z.string()),
		authors: z.array(
			z
				.enum([
					'ryw',
					'samay',
					'adam',
					'rjzv',
					'steven',
					'jay',
					'adarsh',
					'eric',
					'ian',
					'darren',
					'abby',
					'evan',
					'theory',
				])
				.default('ryw'),
		),
	}),
});

export function sortPostDates(
	a: CollectionEntry<'blog'>,
	b: CollectionEntry<'blog'>,
) {
	const aDateString = a.id.substring(0, 10);
	const aParsedDate = a.data?.date || new Date(aDateString);
	const bDateString = b.id.substring(0, 10);
	const bParsedDate = b.data?.date || new Date(bDateString);

	return bParsedDate.valueOf() - aParsedDate.valueOf();
}

export const collections = { blog };
