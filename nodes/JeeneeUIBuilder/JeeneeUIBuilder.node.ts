import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class JeeneeUIBuilder implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Jeenee UI Builder',
		name: 'jeeneeUiBuilder',
		icon: 'file:jeenee_logo.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Build Telegram bot UI components using Jeenee DSL',
		defaults: {
			name: 'Jeenee UI Builder',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				default: '={{$json.session_id}}',
				required: true,
				description: 'Unique session identifier',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				required: true,
				description: 'Main message text to display',
				placeholder: 'Enter your message here...',
			},
			{
				displayName: 'Update Mode',
				name: 'updateMode',
				type: 'options',
				options: [
					{
						name: 'Edit Existing',
						value: 'edit',
						description: 'Edit the current message',
					},
					{
						name: 'Send New',
						value: 'new',
						description: 'Send as a new message',
					},
				],
				default: 'edit',
				description: 'How to display the message',
			},
			{
				displayName: 'Components',
				name: 'components',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Component',
				options: [
					{
						name: 'buttons',
						displayName: 'Buttons',
						values: [
							{
								displayName: 'Custom ID',
								name: 'customId',
								type: 'string',
								default: 'btn',
								required: true,
								description: 'Unique identifier for this button group',
							},
							{
								displayName: 'Button Items',
								name: 'items',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'item',
										displayName: 'Button',
										values: [
									{
										displayName: 'Custom ID',
										name: 'customId',
										type: 'string',
										default: '',
										description: 'Callback data to send when clicked',
									},
									{
										displayName: 'Emoji',
										name: 'emoji',
										type: 'string',
										default: '',
										description: 'Optional emoji prefix',
									},
									{
										displayName: 'Label',
										name: 'label',
										type: 'string',
										default: '',
											required:	true,
									},
									{
										displayName: 'Type',
										name: 'type',
										type: 'options',
										options: [
													{
												name: 'Callback Button',
												value: 'callback',
													},
													{
												name: 'URL Button',
												value: 'url',
													},
												],
										default: 'callback',
									},
									{
										displayName: 'URL',
										name: 'url',
										type: 'string',
										default: '',
										description: 'URL to open when clicked',
									},
					],
									},
								],
							},
						],
					},
					{
						name: 'select',
						displayName: 'Select Menu',
						values: [
							{
						displayName: 'Custom ID',
						name: 'customId',
						type: 'string',
						default: 'select',
							required:	true,
							},
							{
						displayName: 'Max Values',
						name: 'maxValues',
						type: 'number',
						default: 5,
						description: 'Maximum number of selections allowed',
							},
							{
						displayName: 'Options',
						name: 'options',
						type: 'fixedCollection',
						default: {},
						options: [
									{
										name: 'option',
										displayName: 'Option',
											values:	[
													{
												displayName: 'Label',
												name: 'label',
												type: 'string',
												default: '',
													required:	true,
													},
													{
												displayName: 'Value',
												name: 'value',
												type: 'string',
												default: '',
													required:	true,
													},
													{
												displayName: 'Description',
												name: 'description',
												type: 'string',
												default: '',
													},
												]
									},
					]
							},
							{
						displayName: 'Placeholder',
						name: 'placeholder',
						type: 'string',
						default: '',
						description: 'Placeholder text',
							},
							{
						displayName: 'Type',
						name: 'selectType',
						type: 'options',
						options: [
									{
										name: 'Single Select',
										value: 'single',
									},
									{
										name: 'Multi Select',
										value: 'multi',
									},
					],
						default: 'single',
							},
					],
					},
					{
						name: 'textEdit',
						displayName: 'Text Input',
						values: [
							{
						displayName: 'Button Label',
						name: 'saveLabel',
						type: 'string',
						default: '✏️	Edit Text',
							},
							{
						displayName: 'Custom ID',
						name: 'customId',
						type: 'string',
						default: 'text',
							required:	true,
							},
							{
						displayName: 'Max Length',
						name: 'maxLength',
						type: 'number',
						default: 1000
							},
							{
						displayName: 'Placeholder',
						name: 'placeholder',
						type: 'string',
						default: '',
							},
							{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: 'Enter text',
							required:	true,
							},
						],
					},
					{
						name: 'fileUpload',
						displayName: 'File Upload',
						values: [
							{
						displayName: 'Allow Multiple Files',
						name: 'multiple',
						type: 'boolean',
						default: false,
							},
							{
						displayName: 'Button Label',
						name: 'buttonLabel',
						type: 'string',
						default: '📎	Загрузить	файл',
							},
							{
						displayName: 'Custom ID',
						name: 'customId',
						type: 'string',
						default: 'file',
							required:	true,
							},
							{
						displayName: 'Max Files',
						name: 'maxFiles',
						type: 'number',
						default: 5
							},
							{
						displayName: 'Max Size (MB)',
						name: 'maxSizeMb',
						type: 'number',
						default: 50
							},
							{
						displayName: 'Min Files',
						name: 'minFiles',
						type: 'number',
						default: 1
							},
							{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: 'Upload file',
							},
						],
					},
					{
						name: 'richChoices2',
						displayName: 'Rich Choices',
						values: [
							{
								displayName: 'Items',
								name: 'items',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'item',
										displayName: 'Choice',
										values: [
											{
												displayName: 'Custom ID',
												name: 'customId',
												type: 'string',
												default: '',
												required: true,
											},
											{
												displayName: 'Label',
												name: 'label',
												type: 'string',
												default: 'Select',
											},
											{
												displayName: 'Emoji',
												name: 'emoji',
												type: 'string',
												default: '',
											},
											{
												displayName: 'Content Blocks',
												name: 'blocks',
												type: 'fixedCollection',
												typeOptions: {
													multipleValues: true,
												},
												default: {},
												options: [
													{
														name: 'block',
														displayName: 'Block',
														values: [
															{
																displayName: 'Role',
																name: 'role',
																type: 'string',
																default: '',
															},
															{
																displayName: 'Content',
																name: 'content',
																type: 'string',
																typeOptions: {
																	rows: 3,
																},
																default: '',
																required: true,
															},
														],
													},
												],
											},
										],
									},
								],
							},
						],
					},
					{
						name: 'imageChoices',
						displayName: 'Image Choices',
						values: [
							{
								displayName: 'Custom ID',
								name: 'customId',
								type: 'string',
								default: 'img',
								required: true,
							},
							{
								displayName: 'Items',
								name: 'items',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'item',
										displayName: 'Image Choice',
										values: [
											{
												displayName: 'Image URL',
												name: 'imageUrl',
												type: 'string',
												default: '',
												required: true,
											},
											{
												displayName: 'Label',
												name: 'label',
												type: 'string',
												default: '',
												required: true,
											},
											{
												displayName: 'Value',
												name: 'value',
												type: 'string',
												default: '',
												required: true,
											},
										],
									},
								],
							},
						],
					},
					{
						name: 'checkboxes',
						displayName: 'Checkboxes',
						values: [
							{
								displayName: 'Custom ID',
								name: 'customId',
								type: 'string',
								default: 'check',
								required: true,
							},
							{
								displayName: 'Options',
								name: 'options',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'option',
										displayName: 'Option',
										values: [
											{
												displayName: 'Label',
												name: 'label',
												type: 'string',
												default: '',
												required: true,
											},
											{
												displayName: 'Value',
												name: 'value',
												type: 'string',
												default: '',
												required: true,
											},
										],
									},
								],
							},
						],
					},
					{
						name: 'note',
						displayName: 'Note',
						values: [
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								typeOptions: {
									rows: 2,
								},
								default: '',
								required: true,
							},
						],
					},
					{
						name: 'progress',
						displayName: 'Progress Indicator',
						values: [
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								default: 'Processing...',
							},
						],
					},
					{
						name: 'image',
						displayName: 'Image',
						values: [
							{
								displayName: 'Image URL',
								name: 'imageUrl',
								type: 'string',
								default: '',
								required: true,
							},
							{
								displayName: 'Caption',
								name: 'label',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'collection',
				placeholder: 'Add Metadata',
				default: {},
				options: [
					{
						displayName: 'Flow ID',
						name: 'flowId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Step ID',
						name: 'stepId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Version',
						name: 'version',
						type: 'number',
						default: 1,
					},
				],
			},
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const sessionId = this.getNodeParameter('sessionId', i) as string;
				const message = this.getNodeParameter('message', i) as string;
				const updateMode = this.getNodeParameter('updateMode', i) as string;
				const components = this.getNodeParameter('components', i) as any;
				const metadata = this.getNodeParameter('metadata', i, {}) as any;

				// Build components array
				const componentsArray: any[] = [];

				// Process buttons
				if (components.buttons && components.buttons.length > 0) {
					for (const buttonGroup of components.buttons) {
						const items: any[] = [];
						
						if (buttonGroup.items && buttonGroup.items.item) {
							for (const btn of buttonGroup.items.item) {
								const item: any = {
									label: btn.label,
								};

								if (btn.emoji) {
									item.emoji = btn.emoji;
								}

								if (btn.type === 'url') {
									item.url = btn.url;
								} else {
									item.custom_id = btn.customId || `${buttonGroup.customId}:${btn.label}`;
								}

								items.push(item);
							}
						}

						componentsArray.push({
							kind: 'buttons',
							items,
						});
					}
				}

				// Process select
				if (components.select && components.select.length > 0) {
					for (const select of components.select) {
						const options: any[] = [];
						
						if (select.options && select.options.option) {
							for (const opt of select.options.option) {
								options.push({
									label: opt.label,
									value: opt.value,
									...(opt.description && { description: opt.description }),
								});
							}
						}

						const component: any = {
							kind: 'select',
							custom_id: select.customId,
							options,
						};

						if (select.placeholder) {
							component.placeholder = select.placeholder;
						}

						if (select.selectType === 'multi') {
							component.max_values = select.maxValues || 5;
						}

						componentsArray.push(component);
					}
				}

				// Process text edit
				if (components.textEdit && components.textEdit.length > 0) {
					for (const textEdit of components.textEdit) {
						componentsArray.push({
							kind: 'text_edit',
							custom_id: textEdit.customId,
							title: textEdit.title,
							...(textEdit.saveLabel && { save_label: textEdit.saveLabel }),
							...(textEdit.placeholder && { placeholder: textEdit.placeholder }),
							...(textEdit.maxLength && { max_length: textEdit.maxLength }),
						});
					}
				}

				// Process file upload
				if (components.fileUpload && components.fileUpload.length > 0) {
					for (const fileUpload of components.fileUpload) {
						componentsArray.push({
							kind: 'file_upload',
							custom_id: fileUpload.customId,
							...(fileUpload.title && { title: fileUpload.title }),
							...(fileUpload.buttonLabel && { button_label: fileUpload.buttonLabel }),
							...(fileUpload.multiple && { multiple: fileUpload.multiple }),
							...(fileUpload.minFiles && { min_files: fileUpload.minFiles }),
							...(fileUpload.maxFiles && { max_files: fileUpload.maxFiles }),
							...(fileUpload.maxSizeMb && { max_size_mb: fileUpload.maxSizeMb }),
						});
					}
				}

				// Process rich choices 2
				if (components.richChoices2 && components.richChoices2.length > 0) {
					for (const richChoice of components.richChoices2) {
						const items: any[] = [];
						
						if (richChoice.items && richChoice.items.item) {
							for (const item of richChoice.items.item) {
								const blocks: any[] = [];
								
								if (item.blocks && item.blocks.block) {
									for (const block of item.blocks.block) {
										blocks.push({
											...(block.role && { role: block.role }),
											content: block.content,
										});
									}
								}

								items.push({
									custom_id: item.customId,
									...(item.label && { label: item.label }),
									...(item.emoji && { emoji: item.emoji }),
									blocks,
								});
							}
						}

						componentsArray.push({
							kind: 'rich_choices2',
							items,
						});
					}
				}

				// Process image choices
				if (components.imageChoices && components.imageChoices.length > 0) {
					for (const imageChoice of components.imageChoices) {
						const items: any[] = [];
						
						if (imageChoice.items && imageChoice.items.item) {
							for (const item of imageChoice.items.item) {
								items.push({
									image_url: item.imageUrl,
									label: item.label,
									value: item.value,
								});
							}
						}

						componentsArray.push({
							kind: 'image_choices',
							custom_id: imageChoice.customId,
							items,
						});
					}
				}

				// Process checkboxes
				if (components.checkboxes && components.checkboxes.length > 0) {
					for (const checkbox of components.checkboxes) {
						const options: any[] = [];
						
						if (checkbox.options && checkbox.options.option) {
							for (const opt of checkbox.options.option) {
								options.push({
									label: opt.label,
									value: opt.value,
								});
							}
						}

						componentsArray.push({
							kind: 'checkboxes',
							custom_id: checkbox.customId,
							options,
						});
					}
				}

				// Process notes
				if (components.note && components.note.length > 0) {
					for (const note of components.note) {
						componentsArray.push({
							kind: 'note',
							text: note.text,
						});
					}
				}

				// Process progress
				if (components.progress && components.progress.length > 0) {
					for (const progress of components.progress) {
						componentsArray.push({
							kind: 'progress',
							...(progress.text && { text: progress.text }),
						});
					}
				}

				// Process images
				if (components.image && components.image.length > 0) {
					for (const image of components.image) {
						componentsArray.push({
							kind: 'image',
							image_url: image.imageUrl,
							...(image.label && { label: image.label }),
						});
					}
				}

				// Build final UI step
				const uiStep: any = {
					session_id: sessionId,
					message,
					update: updateMode,
					components: componentsArray,
				};

				if (Object.keys(metadata).length > 0) {
					uiStep.metadata = {
						...(metadata.flowId && { flow_id: metadata.flowId }),
						...(metadata.stepId && { step_id: metadata.stepId }),
						...(metadata.version && { version: metadata.version }),
					};
				}

				returnData.push({
					json: uiStep,
					pairedItem: i,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: i,
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

