/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
	config.toolbarGroups = [{
			name: 'document',
			groups: ['mode']
		},
		{
			name: 'styles',
			groups: ['styles']
		},
		{
			name: 'basicstyles',
			groups: ['basicstyles', 'cleanup']
		},
		{
			name: 'paragraph',
			groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
		},
		{
			name: 'links',
			groups: ['links']
		},
		{
			name: 'insert',
			groups: ['insert']
		}
	];

	config.removeButtons = 'CopyFormatting,Iframe,Table,Styles,Print,Font,Underline,Subscript,Superscript,Language,BidiRtl,BidiLtr,CreateDiv,Blockquote,Anchor,Flash,Smiley,PageBreak,Save,NewPage';
	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	//嵌入影片需要額外允許的tag []是允許attribute ()是允許classe
	config.extraAllowedContent = 'script;blockquote[data-lang];blockquote(*);p[lang,dir];img[data-isdeliver];iframe[*];p(';

	// 中文語系
	config.language = 'zh';

	//自訂特殊字元
	config.specialChars = ['‚','、','。','：','；','！','？','／','《','》','〈','〉','「',
		'」','『','』','【','】','“','”','－','－','…','…','▲','►','▼','★','●','[',']','^',
		'_','`','{','|','}','~','‘','’','“','”','–','—','"','#','$','%','&','(',')','*',
		'+','-','<','=','>','@','¢','£','¥','©','®','€'
	];

	////關閉自動過濾 允許所有內容
	// config.allowedContent = true;

};