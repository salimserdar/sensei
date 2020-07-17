import { Button, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMergeReducer } from '../../react-hooks/use-merge-reducer';
import { postTypeLabels } from '../../shared/helpers/labels';

export const ExportSelectContentPage = ( { onSubmit } ) => {
	const [ values, updateValues ] = useMergeReducer( {
		course: false,
		lesson: false,
		question: false,
	} );
	const submit = ( event ) => {
		event.preventDefault();
		const selectedTypes = Object.entries( values ).reduce(
			( m, [ type, value ] ) => {
				if ( value ) m.push( type );
				return m;
			},
			[]
		);
		onSubmit( selectedTypes );
	};

	const hasSelected = Object.values( values ).some( ( v ) => v );

	return (
		<form onSubmit={ submit }>
			<div className="sensei-data-port-step__body">
				<p className="sensei-export__select-content__label">
					{ __(
						'Which type of content would you like to export?',
						'sensei-lms'
					) }
				</p>

				<div className="sensei-export__select-content__options">
					{ Object.entries( values ).map( ( [ type, value ] ) => (
						<CheckboxControl
							className="sensei-export__select-content__option sensei-data-port-step__line"
							key={ type }
							name={ type }
							checked={ value }
							onChange={ ( v ) =>
								updateValues( { [ type ]: v } )
							}
							label={ postTypeLabels[ type ] }
						/>
					) ) }
				</div>
				<div className="sensei-data-port-step__footer">
					<Button type="submit" isPrimary disabled={ ! hasSelected }>
						{ __( 'Generate CSV', 'sensei-lms' ) }
					</Button>
				</div>
			</div>
		</form>
	);
};