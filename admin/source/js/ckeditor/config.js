/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		'/',
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'insert', groups: [ 'insert' ] }

	];
	config.extraAllowedContent = 'img[data-isdeliver];iframe[*]',

	config.removeButtons = 'CopyFormatting,Iframe,Table,Styles,Print,Font,Underline,Subscript,Superscript,Language,BidiRtl,BidiLtr,CreateDiv,Blockquote,Anchor,Flash,Image,SpecialChar,Smiley,PageBreak,Save,NewPage';


	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';


	// 允許所有html tag 包括<script>
	config.allowedContent = true;

	// 中文語系
	config.language = 'zh';


};
